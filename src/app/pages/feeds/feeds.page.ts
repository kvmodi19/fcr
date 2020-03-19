import {
	Component, OnInit
} from '@angular/core';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.page.html',
	styleUrls: [ './feeds.page.scss' ],
})
export class FeedsPage implements OnInit {

	feeds = [
		{
			user: {
				name: 'Alex Cranz',
				avatar: 'assets/images/avatar.svg'
			},
			title: `Bland Content Isn't Apple TV+'s Biggest Problem`,
			image: `assets/images/background.jpg`
		},
		{
			user: {
				name: 'Alex Cranz',
				avatar: 'assets/images/avatar.svg'
			},
			title: `Bland Content Isn't Apple TV+'s Biggest Problem`,
			image: `assets/images/background.jpg`
		},
		{
			user: {
				name: 'Alex Cranz',
				avatar: 'assets/images/avatar.svg'
			},
			title: `Bland Content Isn't Apple TV+'s Biggest Problem`,
			image: `assets/images/background.jpg`
		}
	];

	constructor() { }

	ngOnInit() {
	}

}
