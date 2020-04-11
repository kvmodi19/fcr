import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	Route,
	Router,
	UrlSegment,
} from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

	constructor(
		private router: Router,
		private auth: AuthenticationService
	) { }

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.auth.user.pipe(
			take(1),
			map(
				user => {
					if (!user) {
						this.router.navigateByUrl('/login');
						return false;
					} else {
						return true;
					}
				})
		);
	}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean> | Promise<boolean> | boolean {
		return true;
	}
}
