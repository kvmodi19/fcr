import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/users.model';
import { UsersApiService } from 'src/app/services/api/users.api.service';
import { ServiceProvider } from 'src/app/models/service-provider.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-show-e-card',
  templateUrl: './show-e-card.page.html',
  styleUrls: ['./show-e-card.page.scss'],
})
export class ShowECardPage {

  user: User;
  serviceDetails: ServiceProvider;

  constructor(
    private authenticationServie: AuthenticationService,
    private userService: UsersApiService,
    private loadingController: LoadingController,
  ) { }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      cssClass: 'custom-class custom-loading my-custom-class',
      spinner: 'bubbles',
      keyboardClose: false,
      message: 'Loading...',
      translucent: true,
    });
    await loading.present();
    this.user = this.authenticationServie.getUser();
    this.userService.getUserServiceDetail(this.user['_id'])
      .then((data) => {
        loading.dismiss();
        this.serviceDetails = data.service;
      }).catch((error) => {
        loading.dismiss();
        console.log(error);
      });
  }

}
