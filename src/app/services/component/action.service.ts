import { Injectable } from '@angular/core';

import { ActionSheetController, NavController } from '@ionic/angular';

import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ActionService {
    constructor(
        private actionSheetController: ActionSheetController,
        private authService: AuthenticationService,
        private navCtrl: NavController,
    ) { }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Profile',
                icon: 'person',
                handler: () => {
                    const user = this.authService.getUser();
                    (this.navCtrl as any).navigateForward([`/home/visiting-card/${user.serviceId}`]);
                }
            }, {
                text: 'Log Out',
                icon: 'log-out-outline',
                handler: () => {
                    this.authService.logout();
                }
            }]
        });
        await actionSheet.present();
    }
}