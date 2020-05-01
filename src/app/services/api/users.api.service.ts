import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../models/users.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {

	env = environment;
	users = 'users';

	constructor(private http: HttpClient) {
	}

	get(): void {

	}

	getById(id: number): User {
		return {} as User;
	}

	post(user: User): Promise<any> {
		debugger
		return this.http.post(`${this.env.baseUrl}/${this.env.api}/${this.users}`, user).toPromise();
	}

	update(user: User): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}
}
