import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
	IonInfiniteScroll,
	ModalController
} from '@ionic/angular';

import { environment } from 'src/environments/environment';

import { ActionService } from 'src/app/services/component/action.service';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { User } from '../../models/users.model';
import { FeedsApiService } from '../../services/api/feeds.api.service';
import { NotificationApiService } from '../../services/api/notification.api.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-feeds',
	templateUrl: './feeds.page.html',
	styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage {

	@ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

	env = environment;
	componentLoaded = false;
	feeds = [];
	offset = 0;
	search;
	defaultAvatar = 'assets/images/avatar.svg';
	user: User;

	constructor(
		public router: Router,
		public modalController: ModalController,
		private feedsService: FeedsApiService,
		private actionService: ActionService,
		private authenticationService: AuthenticationService,
		private notificationService: NotificationApiService,
	) { }

	ionViewWillEnter() {
		this.createModal();
	}

	async presentActionSheet() {
		await this.actionService.presentActionSheet();
	}

	getFeedData(event) {
		this.feedsService.search(this.search, this.offset)
			.then((response) => {
				this.feeds = this.feeds.concat(response.data);
				this.offset++;
				this.infiniteScroll.complete();
				if (event && this.feeds.length === response.total) {
					event.target.disabled = true;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getNotifications() {
		this.user = this.authenticationService.getUser();
		this.notificationService.getAllNotificationsByUserID(this.user['_id'])
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
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
				this.search = data.data.search;
				this.getFeedData(null);
				this.getNotifications();
			});
		await modal.present();
	}
}
