import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import {
	BehaviorSubject,
	from,
	Observable,
	of,
} from 'rxjs/index';
import {
	map,
	switchMap,
	take,
} from 'rxjs/operators';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// local variable
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	public user: Observable<any>;
	private userData = new BehaviorSubject(null);

	constructor(
		private storage: Storage,
		private http: HttpClient,
		private plt: Platform,
		private router: Router
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
						this.userData.next(decoded);
						return true;
					} else {
						return null;
					}
				})
		);
	}

	login(credentials: { email: string, pw: string }) {
		// Normally make a POST request to your APi with your login credentials
		if (credentials.email != 'saimon@devdactic.com' || credentials.pw != '123') {
			return of(null);
		}

		return this.http.get('https://randomuser.me/api/')
				   .pipe(
					   take(1),
					   map(
						   res => {
							   // Extract the JWT, here we just fake it
							   return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Njc2NjU3MDYsImV4cCI6MTU5OTIwMTcwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMTIzNDUiLCJmaXJzdF9uYW1lIjoiU2ltb24iLCJsYXN0X25hbWUiOiJHcmltbSIsImVtYWlsIjoic2FpbW9uQGRldmRhY3RpYy5jb20ifQ.4LZTaUxsX2oXpWN6nrSScFXeBNZVEyuPxcOkbbDVZ5U`;
						   }),
					   switchMap(
						   token => {
							   let decoded = helper.decodeToken(token);
							   this.userData.next(decoded);

							   let storageObs = from(this.storage.set(
								   TOKEN_KEY,
								   token
							   ));
							   return storageObs;
						   })
				   );
	}

	getUser() {
		return this.userData.getValue();
	}

	logout() {
		this.storage.remove(TOKEN_KEY)
			.then(() => {
				this.router.navigateByUrl('/');
				this.userData.next(null);
			});
	}
}
