import { Component } from '@angular/core';
import {
	AlertController,
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
		private authService: AuthenticationService
	) { }
	
	ionViewWillEnter() {
		this.user = {} as User;	
	}

	doLogin(form) {
		if (form.valid) {
			this.authService.login(form.value);
		}
	}

}
