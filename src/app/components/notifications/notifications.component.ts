import { Component, Input, OnInit } from '@angular/core';

import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { NotificationApiService } from 'src/app/services/api/notification.api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  @Input() notifications: Observable<Notification[]>;
  notificationsData: Notification[] = [];

  constructor(
    private navCtrl: NavController,
    public modalController: ModalController,
    private notificationApiService: NotificationApiService
  ) { }

  ngOnInit() {
    this.notifications.subscribe((notifications) => {
      this.notificationsData = notifications;
    })
    this.notificationApiService.readAll();
  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  async navigate(item) {
    this.dismissModal();
    await this.notificationApiService.markVisited(item._id);
    (this.navCtrl as any).navigateForward([
      'home',
      'chat-room',
      item.user
    ]);
  }

}
