import {
	Component, OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.page.html',
	styleUrls: [ './feeds.page.scss' ],
})
export class FeedsPage implements OnInit {

	feeds = [
		{
			user: {
				id: 1,
				name: 'Alex Cranz',
				avatar: 'assets/images/avatar.svg'
			},
			title: `Bland Content Isn't Apple TV+'s Biggest Problem`,
			image: `assets/images/background.jpg`
		},
		{
			user: {
				id: 2,
				name: 'Alex Cranz',
				avatar: 'assets/images/avatar.svg'
			},
			title: `Bland Content Isn't Apple TV+'s Biggest Problem`,
			image: `assets/images/background.jpg`
		},
		{
			user: {
				id: 3,
				name: 'Alex Cranz',
				avatar: 'assets/images/avatar.svg'
			},
			title: `Bland Content Isn't Apple TV+'s Biggest Problem`,
			image: `assets/images/background.jpg`
		}
	];

	constructor(
		public router: Router
	) { }

	ngOnInit() {
	}

	showVisitingCard(user) {
		this.router.navigateByUrl(`/home/visiting-card/${user.id}`);
	}
}
