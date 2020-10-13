import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/users.model';
import { UsersApiService } from 'src/app/services/api/users.api.service';
import { ServiceProvider } from 'src/app/models/service-provider.model';
import { LoadingController } from '@ionic/angular';
import { ServiceProvidersApiService } from 'src/app/services/api/service-provider.api.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-show-e-card',
  templateUrl: './show-e-card.page.html',
  styleUrls: ['./show-e-card.page.scss'],
})
export class ShowECardPage {

  user: User;
  serviceDetails: ServiceProvider;

  constructor(
    private authenticationService: AuthenticationService,
    private shopService: ServiceProvidersApiService,
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
    this.authenticationService.getUserData()
      .pipe(
        switchMap((user) => {
          if (user) {
            this.user = user;
            return this.shopService.getUserServiceDetail(this.user.uid).valueChanges()
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        loading.dismiss();
        this.serviceDetails = data ? data[0] : null;
      }, (error) => {
        loading.dismiss();
        console.log(error);
      });
  }

}
