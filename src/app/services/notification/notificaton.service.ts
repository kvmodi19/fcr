import { Injectable } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';

import { NotificationApiService } from '../api/notification.api.service';
import { AuthenticationService } from '../authentication.service';

@Injectable({
	providedIn: 'root'
})
export class NotificatonService {

	private notificationsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
	private notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject([]);

	notificationsCount = this.notificationsCount$.asObservable();
	notifications = this.notifications$.asObservable();

	notificationInterval;

	constructor(
		public modalController: ModalController,
		private notificationService: NotificationApiService,
		private authenticationService: AuthenticationService,
	) { 
		this.getNotifications();
	}

	getNotifications() {
		const user = this.authenticationService.getUser();
		this.notificationService.getUserNotificationCount()
			.then((response) => {
				this.notificationsCount$.next(response.count);
				this.notifications$.next(response.data);
				if (this.notificationInterval) {
					clearInterval(this.notificationInterval);
				}
				this.notificationInterval = setInterval(() => {
					this.getNotifications();
				}, 10 * 1000);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async showNotifications() {
		const modal = await this.modalController.create({
			component: NotificationsComponent,
			swipeToClose: false,
			componentProps: { notifications: this.notifications }
		} as any);

		modal.onDidDismiss()
			.then((data: any) => {
				this.getNotifications();
			});
		await modal.present();
	}
}
