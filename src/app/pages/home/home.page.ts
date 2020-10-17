import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: [ './home.page.scss' ],
})
export class HomePage {

	hideVerticalTab = false;

	constructor(public activatedRoute: Router) {
		activatedRoute.events.subscribe((events) => {
			if (events instanceof NavigationEnd) {
				this.hideVerticalTab = activatedRoute.url !== '/home';
			}
		})
	}

}
