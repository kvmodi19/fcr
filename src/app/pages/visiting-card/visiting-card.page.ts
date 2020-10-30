import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { environment } from '../../../environments/environment';
import { Professions } from '../../models/users.model';
import { FeedsApiService } from '../../services/api/feeds.api.service';
import { ServiceProvider } from 'src/app/models/service-provider.model';
import { ActionService } from 'src/app/services/component/action.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationApiService } from 'src/app/services/api/notification.api.service';
import { NotificatonService } from 'src/app/services/notification/notificaton.service';

@Component({
	selector: 'app-visiting-card',
	templateUrl: './visiting-card.page.html',
	styleUrls: ['./visiting-card.page.scss'],
	providers: [SocialSharing]
})
export class VisitingCardPage {

	env = environment;
	selectedSegment = 'about';
	serviceDetails: ServiceProvider;
	professions = Professions;
	userService: boolean;
	notificationsCount: number = 0;

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private router: Router,
		private feedService: FeedsApiService,
		private actionService: ActionService,
		private socialSharing: SocialSharing,
		private authService: AuthenticationService,
		private notificationApiService: NotificationApiService,
		 private notificationService: NotificatonService
	) {
		this.notificationService.notificationsCount.subscribe((count) => this.notificationsCount = count);
	}

	ionViewWillEnter() {
		let notificationSent = false;
		this.route.params.subscribe((params: { id: string }) => {
			const user = this.authService.getUser();
			this.userService = user.shopOwner && user.serviceId === params.id;
			this.feedService.getById(params.id)
				.then((response) => {
					this.serviceDetails = response.serviceProvider;
					if (!this.userService && !notificationSent) {
						notificationSent = true;
						const notification = {
							title: 'Shop Visit',
							description: `${user.name} visited the shop`,
							for: response.serviceProvider.user._id,
							user: user._id,
							type: 'visit'
						} as any;
						this.notificationApiService.addNotification(notification);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	segmentChanged($event) {
		this.selectedSegment = $event.detail.value;
	}

	redirect(page) {
		switch (page) {
			case 'chat': {
				(this.navCtrl as any).navigateForward(['/home/chat']);
			}
		}
	}

	openChatRoom() {
		(this.navCtrl as any).navigateForward([
			'home',
			'chat-room',
			this.serviceDetails.user['_id']
		]);
	}

	sharePageLink() {
		this.socialSharing.share('message', 'subject', null, environment.playStoreLink);
	}

	async presentActionSheet() {
		await this.actionService.presentActionSheet();
	}

	showNotifications() {
		this.notificationService.showNotifications();
	}

}
