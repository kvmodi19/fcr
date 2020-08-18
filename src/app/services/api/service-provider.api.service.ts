import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ServiceProvider } from 'src/app/models/service-provider.model';

@Injectable({
	providedIn: 'root'
})
export class ServiceProvidersApiService {

	shops = 'shops';
	url = `${environment.baseUrl}/${this.shops}`;

	constructor(private http: HttpClient) {
	}

	get(): void {

	}

	getById(id: string): Promise<ServiceProvider> {
		return this.http.get(`${this.url}/${id}`)
				   .map((response: {user: ServiceProvider}) => {
					   return response.user;
				   })
				   .toPromise();
	}

	post(user: ServiceProvider): Promise<any> {
		return this.http.post(
			`${this.url}`,
			user
		)
				   .toPromise();
	}

	update(user: ServiceProvider): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}
}
