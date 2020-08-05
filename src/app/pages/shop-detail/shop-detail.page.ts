import {
	Component,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
	AlertController,
	LoadingController
} from '@ionic/angular';

import { Shop } from 'src/app/models/shop.model';
import { ShopsApiService } from 'src/app/services/api/shop.api.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
	selector: 'app-shop-detail',
	templateUrl: './shop-detail.page.html',
	styleUrls: [ './shop-detail.page.scss' ],
})
export class ShopDetailPage implements OnInit {

	shopData: Shop;

	constructor(
		private authService: AuthenticationService,
		private shopService: ShopsApiService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) { }

	ngOnInit() {
		this.shopData = {
			address: {}
		} as Shop;
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
					const user = this.authService.getUser();
					if (user) {
						this.shopData.user = user._id;
					}
					this.shopService.post(this.shopData)
						.then(() => {
							loading.dismiss();
							this.router.navigate([ '/home' ]);
						})
						.catch(async (error) => {
							loading.dismiss();
							if (error.error && !error.error.isSuccess) {
								const alert = await this.alertController.create({
									cssClass: 'my-custom-class',
									header: 'Error',
									message: error.error.message || 'Server not working.............\nUnder Process',
									buttons: [ 'OK' ]
								});

								await alert.present();
							}
						});
				},
				5000
			);
		}
	}
}
