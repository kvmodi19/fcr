import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: [ './home.page.scss' ],
})
export class HomePage {

	hideVerticalTab = false;

	constructor(public activatedRoute: Router, authService: AuthenticationService) {
		this.hideVerticalTab = activatedRoute.url !== '/home';
	}

}
