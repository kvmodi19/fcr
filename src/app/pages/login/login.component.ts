import {
	Component,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
		private router: Router,
		public alertController: AlertController
	) { }

	ngOnInit() {}

	doLogin(form) {
		if (form.valid) {
			this.authService.login(form.value)
				.subscribe(
					(res) => {
						if (res) {
							this.router.navigate([ '/home/feeds' ]);
						}
					},
					async (error) => {
						if (error.error && !error.error.isSuccess) {
							const alert = await this.alertController.create({
								cssClass: 'my-custom-class',
								header: 'Error',
								message: 'User not found',
								buttons: [ 'OK' ]
							});

							await alert.present();
						}
					}
				);
		}
	}

}
