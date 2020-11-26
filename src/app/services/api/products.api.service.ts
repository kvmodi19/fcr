import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductsApiService {

	products = 'products';
	url = `${environment.baseUrl}/${this.products}`;

	constructor(private http: HttpClient) { }

	getByProvider(id): Promise<any> {
		return this.http.get(`${this.url}/provider/${id}`).toPromise();
	}

	add(product: Product): Promise<any> {
		return this.http.post(`${this.url}`, product).toPromise();
	}

	update(product: Product, id: string) {
		return this.http.put(`${this.url}/${id}`, product).toPromise();
	}

}
