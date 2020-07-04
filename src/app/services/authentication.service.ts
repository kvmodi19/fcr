import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Platform } from '@ionic/angular';
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

	login(credentials: { email: string, password: string }) {
		return this.http.post(
			`${environment.baseUrl}/login`,
			{ ...credentials },
		)
				   .pipe(
					   take(1),
					   map((res: any) => {
						   return res.token;
					   }),
					   switchMap(
						   token => {
							   const decoded = helper.decodeToken(token);
							   this.userData.next(decoded);

							   return from(this.storage.set(
								   TOKEN_KEY,
								   token
							   ));
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
