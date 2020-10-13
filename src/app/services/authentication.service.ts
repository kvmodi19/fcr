import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { NavController } from '@ionic/angular';

import { BehaviorSubject, Observable } from 'rxjs/index';

import { Professions, User } from '../models/users.model';
import { UsersApiService } from './api/users.api.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public user: Observable<User>;
	private userData = new BehaviorSubject(null);

	constructor(
		private firebaseAuth: AngularFireAuth,
		private navCtrl: NavController,
		private userService: UsersApiService
	) {
		this.loadStoredToken();
	}

	loadStoredToken() {
		this.user = this.firebaseAuth.authState;

		this.user.subscribe((user) => {
			debugger
			if (user) {
				this.userService
					.getUserDetail(user.email)
					.subscribe((data) => {
						debugger
						data.forEach((el) => {
							this.userData.next(el.user);
							if (el.user.profession === Professions["service-provider"] && !el.service) {
								(this.navCtrl as any).navigateForward('/service-provider-detail');
							}
						});
					});
			} else {
				this.userData.next(null);
			}
		});
	}

	login(credentials: { email: string, password: string }) {
		return this.firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	registerUser(credentials: { email: string, password: string }) {
		return this.firebaseAuth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	getUser() {
		return this.getUserData().getValue();
	}

	getUserData() {
		return this.userData;
	}

	logout() {
		debugger
		this.firebaseAuth.signOut().then((res) => {
			this.userData.next(null);
			(this.navCtrl as any).navigateForward('/login');
		});
	}
}
