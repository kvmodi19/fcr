import { Component } from '@angular/core';

import {
	AlertController,
	LoadingController,
	NavController
} from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { Professions, User } from '../../models/users.model';
import { UsersApiService } from '../../services/api/users.api.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

	professions = Professions;
	userData: User;
	emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
	passwordPattern = `^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$`;

	constructor(
		private userService: UsersApiService,
		private authService: AuthenticationService,
		private alertController: AlertController,
		private navCtrl: NavController,
		private loadingController: LoadingController
	) { }

	ionViewDidEnter() {
		this.userData = {
			profession: Professions.user,
			gender: ''
		} as User;
	}

	async submitForm(registration) {
		if (registration.valid) {
			const loading = await this.loadingController.create({
				cssClass: 'custom-class custom-loading my-custom-class',
				spinner: 'bubbles',
				keyboardClose: false,
				message: 'Submitting...',
				translucent: true,
			});
			await loading.present();
			const { email, password } = this.userData;
			this.authService.registerUser({ email, password })
				.then((res) => {
					delete this.userData['confirmPassword'];
					const user = {
						...this.userData,
						uid: res.user.uid
					} as User;
					this.userService.post(user)
						.then(() => {
							loading.dismiss();
							(this.navCtrl as any).navigateForward(['/']);
						}).catch((err) => {
							console.log('error', err);
						});

				})
				.catch(async (error) => {
					loading.dismiss();
					if (error) {
						let message = '';
						switch (error.code) {
							case "auth/email-already-in-use": {
								message = error.message;
								break;
							}
							default: {
								message = "Error while Registering user";
							}
						}

						const alert = await this.alertController.create({
							cssClass: 'my-custom-class',
							header: 'Error',
							message: message,
							buttons: ['OK']
						});

						await alert.present();
					}
				});
		}
	}
}
