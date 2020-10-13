import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ActionService {
    constructor(
        private actionSheetController: ActionSheetController,
        private authService: AuthenticationService
        ) { }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            cssClass: 'my-custom-class',
            buttons: [{
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