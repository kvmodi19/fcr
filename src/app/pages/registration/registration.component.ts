import { Component } from '@angular/core';
import {
	AlertController,
	LoadingController,
	NavController
} from '@ionic/angular';

import { AuthenticationService } from 'src/app/services/authentication.service';
import {
	Professions,
	User
} from '../../models/users.model';
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
	mobNumberPattern = '[0-9]{10}$';

	constructor(
		private userService: UsersApiService,
		private alertController: AlertController,
		private navCtrl: NavController,
		private loadingController: LoadingController,
		private authService: AuthenticationService
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
			setTimeout(() => {
				this.userService.register(this.userData)
					.then(() => {
						loading.dismiss();
						const { email, password } = registration.value;
						this.authService.login({ email, password });
					})
					.catch(async (error) => {
						loading.dismiss();
						if (error.error && !error.error.isSuccess) {
							const alert = await this.alertController.create({
								cssClass: 'my-custom-class',
								header: 'Error',
								message: error.error.message || 'Server not working.............\nUnder Process',
								buttons: ['OK']
							});

							await alert.present();
						}
					});
			}, 5000);
		}
	}
}
