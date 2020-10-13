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
import { ServiceProvidersApiService } from 'src/app/services/api/service-provider.api.service';
import { ServiceProvider } from 'src/app/models/service-provider.model';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

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
	offset: AngularFirestoreDocument<ServiceProvider>;
	search;
	defaultAvatar = 'assets/images/avatar.svg';
	user;

	constructor(
		private navCtrl: NavController,
		public modalController: ModalController,
		private serviceProviderService: ServiceProvidersApiService,
		private actionService: ActionService,
		private authenticationService: AuthenticationService,
		private notificationService: NotificationApiService,
	) { }

	async ionViewDidEnter() {
		this.authenticationService.getUserData().subscribe((user) => {
			this.user = user;
		});
		this.createModal();
	}

	async presentActionSheet() {
		await this.actionService.presentActionSheet();
	}

	getFeedData(event) {
		this.serviceProviderService.search(this.search, this.offset, this.user.uid)
			.subscribe((response) => {
				debugger
				// this.feeds = this.feeds.concat(response);
				// this.offset = response[response.length - 1];
				// this.infiniteScroll.complete();
				// if (event && this.feeds.length === response.total) {
				// 	event.target.disabled = true;
				// }
			}, (error) => {
				console.log(error);
			});
	}

	getNotifications() {
		this.notificationService.getAllNotificationsByUserID(this.user.uid)
			.then((response) => {
				console.log(response);
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
				this.getFeedData(null);
				// this.getNotifications();
			});
		await modal.present();
	}
}
