import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../models/users.model';
import { ServiceProvider } from 'src/app/models/service-provider.model';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {

	users = 'users';
	url = `${environment.baseUrl}/${this.users}`;

	constructor(private http: HttpClient) {
	}

	get(): void {

	}

	getById(id: string): Promise<User> {
		return this.http.get(`${this.url}/${id}`)
				   .map((response: {user: User}) => {
					   return response.user;
				   })
				   .toPromise();
	}

	post(user: User): Promise<any> {
		return this.http.post(
			`${this.url}`,
			user
		)
				   .toPromise();
	}

	update(user: User): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}

	getUserServiceDetail(userID): Promise<{success: boolean, service: ServiceProvider}> {
		return this.http.get(`${this.url}/${userID}/service`).toPromise() as Promise<{success: boolean, service: ServiceProvider}>;
	}

	register(user: User): Promise<any> {
		return this.http.post(
			`${environment.baseUrl}/register`,
			user
		)
				   .toPromise();
	}
}
