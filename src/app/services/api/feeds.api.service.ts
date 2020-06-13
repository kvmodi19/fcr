import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../models/users.model';

@Injectable({
	providedIn: 'root'
})
export class FeedsApiService {

	shops = 'shops';
	url = `${environment.baseUrl}/${this.shops}`;

	constructor(private http: HttpClient) {
	}

	get(): Promise<any> {
		return this.http.get(this.url).toPromise();
	}

	getById(id: string): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise();
	}

	search(search: {text: string, searchBy: string}): Promise<any> {
		return this.http.post(`${this.url}/search`, search).toPromise();
	}

	post(shop: User): Promise<any> {
		return this.http.post(`${this.url}`, shop).toPromise();
	}

	update(user: User): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}
}
