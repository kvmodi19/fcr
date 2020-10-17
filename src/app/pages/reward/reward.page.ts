import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AddRewardModalComponent } from 'src/app/components/add-reward-modal/add-reward-modal.component';
import { PromoCode } from 'src/app/models/promoCode.model';
import { PromoCodeApiService } from 'src/app/services/api/promocode.api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActionService } from 'src/app/services/component/action.service';

@Component({
	selector: 'app-reward',
	templateUrl: './reward.page.html',
	styleUrls: ['./reward.page.scss'],
})
export class RewardPage implements OnInit {

	user: {
		shopOwner: boolean, hasShop: boolean, serviceId: string
	};

	promoCodes: PromoCode[];

	constructor(
		private authService: AuthenticationService,
		private promoCodeService: PromoCodeApiService,
		private actionService: ActionService,
		private modalController: ModalController,
	) { }

	ngOnInit() {
		this.user = this.authService.getUser() as { shopOwner: boolean, hasShop: boolean, serviceId: string };
		if (this.user.shopOwner) {
			this.getPromoCodeByProvider();
		} else {
			this.promoCodeService.getPromoCodeByUser(this.user['_id'])
				.then((res) => {
					this.promoCodes = res;
				})
				.catch((err) => {
					debugger
				});
		}
	}

	getPromoCodeByProvider() {
		this.promoCodeService.getPromoCodeByProvider(this.user.serviceId)
			.then((res) => {
				this.promoCodes = res;
			})
			.catch((err) => {
				debugger
			});
	}

	async presentActionSheet() {
		await this.actionService.presentActionSheet();
	}

	async addReward() {
		const modal = await this.modalController.create({
			component: AddRewardModalComponent,
			swipeToClose: true,
		} as any);

		modal.onDidDismiss()
			.then((data: any) => {
				if (data.data.reward) {
					const reward = {
						...data.data.reward,
						serviceProvider: this.user.serviceId
					}
					this.promoCodeService.addPromoCode(reward)
						.then((response) => {
							this.getPromoCodeByProvider();
						})
						.catch((error) => {
							debugger
							console.log(error);
						})
				}
			});
		await modal.present();
	}
}
