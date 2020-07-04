import {
	Component,
	OnInit
} from '@angular/core';
import {
	Professions,
	User
} from '../../models/users.model';
import { UsersApiService } from '../../services/api/users.api.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: [ './registration.component.scss' ],
})
export class RegistrationComponent implements OnInit {

	professions = Professions;
	userData: User;
	emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

	constructor(private userService: UsersApiService) { }

	ngOnInit() {
		this.userData = {
			profession: Professions.employee,
			gender: ''
		} as User;
	}

	submitForm(registration) {
		if (registration.valid) {
			this.userService.post(this.userData)
				.then((response: User) => {
					console.log(
						'response',
						response
					);
				})
				.catch((error) => {
					console.log(
						'error',
						error
					);
				});
		}
	}

}
