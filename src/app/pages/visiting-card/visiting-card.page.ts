import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { AddProductsModalComponent } from 'src/app/components/add-products-modal/add-products-modal.component';
import { Product } from 'src/app/models/product.model';

import { ServiceProvider } from 'src/app/models/service-provider.model';
import { NotificationApiService } from 'src/app/services/api/notification.api.service';
import { ProductsApiService } from 'src/app/services/api/products.api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActionService } from 'src/app/services/component/action.service';
import { NotificatonService } from 'src/app/services/notification/notificaton.service';
import { environment } from '../../../environments/environment';
import { Professions, User } from '../../models/users.model';
import { FeedsApiService } from '../../services/api/feeds.api.service';

@Component({
	selector: 'app-visiting-card',
	templateUrl: './visiting-card.page.html',
	styleUrls: ['./visiting-card.page.scss'],
	providers: [SocialSharing]
})
export class VisitingCardPage {

	env = environment;
	selectedSegment = 'about';
	serviceDetails: ServiceProvider;
	professions = Professions;
	userService: boolean;
	notificationsCount = 0;
	products: Product[] = [];

	constructor(
		private navCtrl: NavController,
		private route: ActivatedRoute,
		private feedService: FeedsApiService,
		private actionService: ActionService,
		private socialSharing: SocialSharing,
		private authService: AuthenticationService,
		private notificationApiService: NotificationApiService,
		private notificationService: NotificatonService,
		private modalController: ModalController,
		private productApiService: ProductsApiService,
		public toastController: ToastController,
		private loadingController: LoadingController
	) {
		this.notificationService.notificationsCount.subscribe((count) => this.notificationsCount = count);
	}

	ionViewWillEnter() {
		let notificationSent = false;
		this.route.params.subscribe((params: { id: string }) => {
			const user = this.authService.getUser();
			this.userService = !!(user && user.shopOwner && user.serviceId === params.id);
			this.feedService.getById(params.id)
				.then((response) => {
					this.serviceDetails = response.serviceProvider;
					this.getProducts();
					if (!this.userService && !notificationSent) {
						notificationSent = true;
						const notification = {
							title: 'Shop Visit',
							description: `${user ? user.name : '1 User'} visited the shop`,
							for: response.serviceProvider.user._id,
							user: user ? user._id : null,
							type: 'visit'
						} as any;
						this.notificationApiService.addNotification(notification);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		});
	}

	segmentChanged($event) {
		this.selectedSegment = $event.detail.value;
	}

	redirect(page) {
		switch (page) {
			case 'chat': {
				(this.navCtrl as any).navigateForward(['/home/chat']);
			}
		}
	}

	openChatRoom() {
		(this.navCtrl as any).navigateForward([
			'home',
			'chat-room',
			this.serviceDetails.user['_id']
		]);
	}

	sharePageLink() {
		this.socialSharing.share('message', 'subject', null, environment.playStoreLink);
	}

	async presentActionSheet() {
		await this.actionService.presentActionSheet();
	}

	showNotifications() {
		this.notificationService.showNotifications();
	}

	async addProduct() {
		const modal = await this.modalController.create({
			component: AddProductsModalComponent,
			swipeToClose: true,
		} as any);

		modal.onDidDismiss()
			.then(async (data: any) => {
				if (data.data.product) {
					const loading = await this.loadingController.create({
						cssClass: 'custom-class custom-loading my-custom-class',
						spinner: 'bubbles',
						keyboardClose: false,
						message: 'Adding Product...',
						translucent: true,
					});
					await loading.present();
					const product = {
						...data.data.product,
						serviceProvider: this.serviceDetails['_id'],
					};
					await this.productApiService.add(product);
					loading.dismiss();
					this.presentToast('Product Added...');
					this.getProducts();
				}
			});
		await modal.present();
	}

	getProducts() {
		this.productApiService.getByProvider(this.serviceDetails['_id'])
			.then((response) => {
				this.products = response;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async updateProduct(product) {
		const modal = await this.modalController.create({
			component: AddProductsModalComponent,
			swipeToClose: true,
			componentProps: {
				product,
				isEdit: true
			}
		} as any);

		modal.onDidDismiss()
			.then(async (data: any) => {
				if (data.data.product) {
					const loading = await this.loadingController.create({
						cssClass: 'custom-class custom-loading my-custom-class',
						spinner: 'bubbles',
						keyboardClose: false,
						message: 'Updating Product...',
						translucent: true,
					});
					await loading.present();
					const updatedProduct = {
						...product,
						...data.data.product
					};
					await this.productApiService.update(updatedProduct, updatedProduct._id);
					loading.dismiss();
					this.presentToast('Product Updated...');
					this.getProducts();
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
