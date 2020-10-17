import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PromoCode } from 'src/app/models/promoCode.model';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PromoCodeApiService {

	promoCodes = 'promoCodes';
	url = `${environment.baseUrl}/${this.promoCodes}`;

	constructor(private http: HttpClient) { }

	addPromoCode(promoCode: PromoCode): Promise<any> {
		return this.http.post(`${this.url}`, promoCode).toPromise();
	}

	updatePromoCode(id: string, promoCode: PromoCode): Promise<any> {
		return this.http.put(`${this.url}/${id}`, promoCode).toPromise();
	}

	getAllpromoCodes(): Promise<any> {
		return this.http.get(`${this.url}/all`).toPromise();
	}

	getPromoCodeByID(id): Promise<any> {
		return this.http.get(`${this.url}/${id}`).toPromise();
	}

	getPromoCodeByProvider(id: string): Promise<any> {
		return this.http.get(`${this.url}/provider/${id}`).toPromise();
	}

	getPromoCodeByUser(id: string): Promise<any> {
		return this.http.get(`${this.url}/user/${id}`).toPromise();
	}
}
