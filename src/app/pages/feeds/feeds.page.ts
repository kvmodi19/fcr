import {
	Component,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { SearchModalComponent } from '../../components/search-modal/search-modal.component';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.page.html',
	styleUrls: [ './feeds.page.scss' ],
})
export class FeedsPage implements OnInit {

	feeds;

	constructor(
		public router: Router,
		public modalController: ModalController
	) { }

	ngOnInit() {
		setTimeout(() => {
			this.feeds = [
				{
					user: {
						id: 1,
						name: 'User name',
						avatar: 'assets/images/avatar.svg',
						country: 'india',
						city: 'surat',
						state: 'gujarat',
						pinCode: 395009
					},
					shopName: `Company Name`,
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
		}, 5 * 1000);
	}

	showVisitingCard(user) {
		this.router.navigateByUrl(`/home/visiting-card/${user.id}`);
	}

	async createModal() {
		const modal = await this.modalController.create({
			component: SearchModalComponent,
			swipeToClose: true,
		} as any);

		modal.onDidDismiss().then((data) => {
			// Call the method to do whatever in your home.ts
			console.log('Modal closed', data);
		});
		await modal.present();
	}
}
