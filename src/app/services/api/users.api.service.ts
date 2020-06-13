import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../models/users.model';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {

	users = 'users';
	url = `${environment.baseUrl}/${environment.api}/${this.users}`;

	constructor(private http: HttpClient) {
	}

	get(): void {

	}

	getById(id: number): User {
		return {} as User;
	}

	post(user: User): Promise<any> {
		return this.http.post(`${this.users}`, user).toPromise();
	}

	update(user: User): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}
}
