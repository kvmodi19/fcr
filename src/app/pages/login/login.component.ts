import {
	Component,
	OnInit
} from '@angular/core';
import {
	AlertController,
	NavController
} from '@ionic/angular';

import { User } from '../../models/users.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ],
})
export class LoginComponent implements OnInit {

	user: User = {} as User;
	emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

	constructor(
		private authService: AuthenticationService,
		public alertController: AlertController,
		public navCtrl: NavController,
	) { }

	ngOnInit() {}

	doLogin(form) {
		if (form.valid) {
			this.authService.login(form.value)
				.then((res) => {
					if (res) {
						const user = this.authService.getUser() as { shopOwner: boolean, hasShop: boolean };
						if (user.shopOwner && !user.hasShop) {
							(this.navCtrl as any).navigateForward('/service-provider');
						} else {
							(this.navCtrl as any).navigateForward('/home');
						}
					}
				})
				.catch(async (error) => {
					if (error.error && !error.error.isSuccess) {
						const alert = await this.alertController.create({
							cssClass: 'my-custom-class',
							header: 'Error',
							message: error.error.message || 'Server not working.............\nUnder Process',
							buttons: [ 'OK' ]
						});

						await alert.present();
					}
				});
		}
	}

}
