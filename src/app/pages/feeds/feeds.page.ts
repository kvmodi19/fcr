import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {
	IonInfiniteScroll,
	ModalController,
	NavController
} from '@ionic/angular';

import { environment } from 'src/environments/environment';

import { ActionService } from 'src/app/services/component/action.service';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { User } from '../../models/users.model';
import { FeedsApiService } from '../../services/api/feeds.api.service';
import { NotificationApiService } from '../../services/api/notification.api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { NotificatonService } from 'src/app/services/notification/notificaton.service';

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
	notificationsCount: number;

	constructor(
		private navCtrl: NavController,
		public modalController: ModalController,
		private feedsService: FeedsApiService,
		private actionService: ActionService,
		private notificationService: NotificatonService
	) {
		this.notificationService.notificationsCount.subscribe((count) => this.notificationsCount = count);
	 }

	ionViewWillEnter() {
		this.feeds = [];
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

	showVisitingCard(user) {
		(this.navCtrl as any).navigateForward(`/home/visiting-card/${user._id}`);
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
				this.offset = 0;
				this.getFeedData(null);
			});
		await modal.present();
	}

	showNotifications() {
		this.notificationService.showNotifications();
	}
}
