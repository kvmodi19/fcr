import {
	Component,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { environment } from '../../../environments/environment';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { FeedsApiService } from '../../services/api/feeds.api.service';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.page.html',
	styleUrls: [ './feeds.page.scss' ],
})
export class FeedsPage implements OnInit {

	env = environment;
	componentLoaded = false;
	feeds;
	defaultAvatar = 'assets/images/avatar.svg';

	constructor(
		public router: Router,
		public modalController: ModalController,
		private feedsService: FeedsApiService,
	) { }

	ngOnInit() {
		this.createModal();
	}

	getFeedData() {
		this.feedsService.get()
			.then((data) => {
				this.feeds = data;
			})
			.catch((error) => {
				console.log(
					'feeds -> get -> error',
					error
				);
			});
	}

	showVisitingCard(user) {
		this.router.navigateByUrl(`/home/visiting-card/${user._id}`);
	}

	async createModal() {
		const modal = await this.modalController.create({
			component: SearchModalComponent,
			swipeToClose: true,
		} as any);

		modal.onDidDismiss()
			 .then((data: any) => {
				 this.componentLoaded = true;
				 if (data && data.data.search && data.data.search.text) {
					 this.feedsService.search(data.data.search)
						 .then((response) => {
							 this.feeds = response.data;
						 })
						 .catch((error) => {
							 console.log(error);
						 });
				 } else {
					 this.getFeedData();
				 }
			 });
		await modal.present();
	}
}
