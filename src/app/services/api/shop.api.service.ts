import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Shop } from 'src/app/models/shop.model';

@Injectable({
	providedIn: 'root'
})
export class ShopsApiService {

	shops = 'shops';
	url = `${environment.baseUrl}/${this.shops}`;

	constructor(private http: HttpClient) {
	}

	get(): void {

	}

	getById(id: string): Promise<Shop> {
		return this.http.get(`${this.url}/${id}`)
				   .map((response: {user: Shop}) => {
					   return response.user;
				   })
				   .toPromise();
	}

	post(user: Shop): Promise<any> {
		return this.http.post(
			`${this.url}`,
			user
		)
				   .toPromise();
	}

	update(user: Shop): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}
}
