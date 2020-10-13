import { Component } from '@angular/core';
import {
	AlertController,
	LoadingController,
	NavController
} from '@ionic/angular';

import { User } from '../../models/users.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

	user: User = {} as User;
	emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

	constructor(
		private authService: AuthenticationService,
		public alertController: AlertController,
		public navCtrl: NavController,
		private loadingController: LoadingController
	) { }

	ionViewWillEnter() {
		this.user = {} as User;
	}

	async doLogin(form) {
		if (form.valid) {
			const loading = await this.loadingController.create({
				cssClass: 'custom-class custom-loading my-custom-class',
				spinner: 'bubbles',
				keyboardClose: false,
				message: 'Submitting...',
				translucent: true,
			});
			await loading.present();
			this.authService.login(form.value)
				.then((res) => {
					loading.dismiss();
					(this.navCtrl as any).navigateForward('/home');
				})
				.catch(async (error) => {
					loading.dismiss();
					if (error) {
						let message = '';
						switch (error.code) {
							case "auth/wrong-password": {
								message = 'Entered wrong password';
								break;
							}
							case "auth/user-not-found": {
								message = 'User does not exisits';
								break;
							}
							default: {
								message = "Error while login";
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
