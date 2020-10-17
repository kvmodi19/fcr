import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {
	BehaviorSubject,
	from,
	Observable
} from 'rxjs/index';
import {
	map,
	switchMap,
	take
} from 'rxjs/operators';
import { environment } from '../../environments/environment';

// local variable
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public user: Observable<any>;
	private token = new BehaviorSubject('');
	private userData = new BehaviorSubject(null);

	constructor(
		private storage: Storage,
		private http: HttpClient,
		private plt: Platform,
		private navCtrl: NavController,
		public alertController: AlertController,
	) {
		this.loadStoredToken();
	}

	loadStoredToken() {
		const platformObs = from(this.plt.ready());

		this.user = platformObs.pipe(
			switchMap(() => {
				return from(this.storage.get(TOKEN_KEY));
			}),
			map(
				token => {
					if (token) {
						const decoded = helper.decodeToken(token);
						const expiretime = decoded.exp * 1000;
						if (expiretime > new Date().getTime()) {
							this.userData.next(decoded);
							this.token.next(token);
							return true;
						}
						this.logout();
						return null;
					} else {
						return null;
					}
				})
		);
	}

	setToken(token) {
		const decoded = helper.decodeToken(token);
		this.userData.next(decoded);
		return this.storage.set(
			TOKEN_KEY,
			token
		)
	}

	login(credentials: { email: string, password: string }): Promise<void> {
		return this.http.post(
			`${environment.baseUrl}/login`,
			{ ...credentials },
		)
			.pipe(
				take(1),
				map((res: any) => {
					return res.token;
				}),
				switchMap(token => from(this.setToken(token)))).toPromise()
			.then((res) => {
				if (res) {
					const user = this.getUser() as { shopOwner: boolean, hasShop: boolean, serviceId: string };
					if (user.shopOwner && !user.hasShop) {
						(this.navCtrl as any).navigateForward('/service-provider-detail');
					} else {
						if (user.shopOwner) {
							(this.navCtrl as any).navigateForward(`/home/visiting-card/${user.serviceId}`);
						} else {
							(this.navCtrl as any).navigateForward('/home');
						}
					}
				}
			})
			.catch(async (error) => {
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

	getUser() {
		return this.userData.getValue();
	}

	logout() {
		this.storage.remove(TOKEN_KEY)
			.then(() => {
				(this.navCtrl as any).navigateForward('/login');
				this.userData.next(null);
				this.token.next(null);
			});
	}

	getToken(): string {
		return this.token.getValue();
	}
}
