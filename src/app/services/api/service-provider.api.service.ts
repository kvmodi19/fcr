import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ServiceProvider } from 'src/app/models/service-provider.model';

@Injectable({
	providedIn: 'root'
})
export class ServiceProvidersApiService {

	collection = 'services';
	limit = 10;

	constructor(public firestore: AngularFirestore) {
	}

	get(): AngularFirestoreCollection<ServiceProvider> {
		return this.firestore.collection(this.collection);
	}

	getById(id: string): AngularFirestoreDocument<ServiceProvider> {
		return this.firestore.collection(this.collection).doc(id);
	}

	post(service: ServiceProvider): Promise<void> {
		const serviceID = this.firestore.createId();
		return this.firestore.doc(`${this.collection}/${serviceID}`).set(service);
	}

	update(user: ServiceProvider): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}

	getUserServiceDetail(userID: string): AngularFirestoreCollection<ServiceProvider> {
		return this.firestore.collection<ServiceProvider>(this.collection, ref => ref.where('userID', '==', userID));
	}

	search(search: { text: string, searchBy: string }, startAfter: AngularFirestoreDocument<ServiceProvider>, userID: string): Observable<ServiceProvider> {
		debugger
		if (startAfter) {
			return this.firestore.collection<ServiceProvider>(this.collection, ref =>
				ref.where('userID', '!=', userID)
			).valueChanges().pipe(switchMap((services) => this.populateUsers(services)));
		} else {
			return this.firestore.collection<ServiceProvider>(this.collection, ref =>
				ref.where('userID', '!=', userID)
			).valueChanges().pipe(switchMap((services) => this.populateUsers(services)))
		}
	}

	populateUsers(services): Observable<ServiceProvider> {

		const userIDs = services.map(service => service.userID);
		const users = userIDs.map(userID =>
			this.firestore.collection<ServiceProvider>('users', ref => ref.where('uid', '==', userID)).valueChanges().pipe(
				map(user => user[0])
			)
		);
		debugger
		return;
	}
}
