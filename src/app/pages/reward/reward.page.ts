import { Component, OnInit } from '@angular/core';

import { LoadingController, ModalController, ToastController } from '@ionic/angular';

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
		public toastController: ToastController,
		private loadingController: LoadingController,
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
					console.log(err);
				});
		}
	}

	getPromoCodeByProvider() {
		this.promoCodeService.getPromoCodeByProvider(this.user.serviceId)
			.then((res) => {
				this.promoCodes = res;
			})
			.catch((err) => {
				console.log(err);
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
			.then(async (data: any) => {
				if (data.data.reward) {
					const loading = await this.loadingController.create({
						cssClass: 'custom-class custom-loading my-custom-class',
						spinner: 'bubbles',
						keyboardClose: false,
						message: 'Adding Reward...',
						translucent: true,
					});
					await loading.present();
					const reward = {
						...data.data.reward,
						serviceProvider: this.user.serviceId
					};
					this.promoCodeService.addPromoCode(reward)
						.then((response) => {
							loading.dismiss();
							this.presentToast('Reward Added...');
							this.getPromoCodeByProvider();
						})
						.catch((error) => {
							console.log(error);
							loading.dismiss();
							this.presentToast('Reward Added...');
						});
				}
			});
		await modal.present();
	}

	async updateReward(item) {
		const modal = await this.modalController.create({
			component: AddRewardModalComponent,
			swipeToClose: true,
			componentProps: {
				reward: item,
				isEdit: true
			}
		} as any);

		modal.onDidDismiss()
			.then(async (data: any) => {
				if (data.data.reward) {
					const loading = await this.loadingController.create({
						cssClass: 'custom-class custom-loading my-custom-class',
						spinner: 'bubbles',
						keyboardClose: false,
						message: 'Updating Reward...',
						translucent: true,
					});
					await loading.present();
					const reward = {
						...item,
						...data.data.reward,
					};
					this.promoCodeService.updatePromoCode(item._id, reward)
						.then((response) => {
							loading.dismiss();
							this.presentToast('Reward Updated...');
							this.getPromoCodeByProvider();
						})
						.catch((error) => {
							loading.dismiss();
							this.presentToast('Reward Updated...');
							console.log(error);
						});
				}
			});
		await modal.present();
	}

	async presentToast(message) {
		const toast = await this.toastController.create({
			message,
			duration: 2000
		});
		toast.present();
	}
}
