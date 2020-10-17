import { Component } from '@angular/core';
import {
	AlertController,
	LoadingController,
	NavController
} from '@ionic/angular';

import { ServiceProvider } from 'src/app/models/service-provider.model';
import { ServiceProvidersApiService } from 'src/app/services/api/service-provider.api.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-service-provider',
	templateUrl: './service-provider-detail.page.html',
	styleUrls: ['./service-provider-detail.page.scss'],
})
export class ServiceProviderDetailPage {

	shopData: ServiceProvider;

	constructor(
		private authService: AuthenticationService,
		private shopService: ServiceProvidersApiService,
		private alertController: AlertController,
		private navCtrl: NavController,
		private loadingController: LoadingController
	) { }

	ionViewWillEnter() {
		this.shopData = {
			address: {}
		} as ServiceProvider;
	}

	async submitForm(shop) {
		if (shop.valid) {
			const loading = await this.loadingController.create({
				cssClass: 'custom-class custom-loading my-custom-class',
				spinner: 'bubbles',
				keyboardClose: false,
				message: 'Submitting...',
				translucent: true,
			});
			await loading.present();
			setTimeout(
				() => {
					let user = this.authService.getUser();
					if (user) {
						this.shopData.user = user._id;
					}
					this.shopService.post(this.shopData)
						.then((res) => {
							this.authService.setToken(res.token);
							loading.dismiss();
							user = this.authService.getUser();
							(this.navCtrl as any).navigateForward([`/home/visiting-card/${user.serviceId}`]);
						})
						.catch(async (error) => {
							loading.dismiss();
							if (error.error && !error.error.isSuccess) {
								const alert = await this.alertController.create({
									cssClass: 'my-custom-class',
									header: 'Error',
									message: error.error.message || 'Server not working.............\nUnder Process',
									buttons: ['OK']
								});

								await alert.present();
							}
						});
				}
			);
		}
	}
}
