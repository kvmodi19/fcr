import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Notification } from 'src/app/models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NotificationApiService {

	notifications = 'notifications';
	url = `${environment.baseUrl}/${this.notifications}`;

	constructor(private http: HttpClient) { }

	getAllNotificationsByUserID(userID): Promise<any> {
		return this.http.get(`${this.url}?userID=${userID}`).toPromise();
	}

	addNotification(notification: Notification): Promise<any> {
		return this.http.post(`${this.url}`, notification).toPromise();
	}

	getAllNotifications(): Promise<any> {
		return this.http.get(`${this.url}/all`).toPromise();
	}

	getNotificationByID(id): Promise<any> {
		return this.http.get(`${this.url}/id`).toPromise();
	}
}
