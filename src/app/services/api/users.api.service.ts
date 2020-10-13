import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { User } from '../../models/users.model';
import { ServiceProvider } from 'src/app/models/service-provider.model';

@Injectable({
	providedIn: 'root'
})
export class UsersApiService {

	collection = `users`;

	constructor(public firestore: AngularFirestore) {
	}

	get(): AngularFirestoreCollection<User> {
		return this.firestore.collection(this.collection);
	}

	getById(id: string): AngularFirestoreDocument<User> {
		return this.firestore.collection(this.collection).doc(id);
	}

	getUserDetail(email): Observable<{ user: User, service: ServiceProvider }[]> {
		return this.firestore.collection<User>(this.collection, ref => ref.where('email', '==', email)).valueChanges()
			.pipe(
				switchMap(users => {
					const userIDs = users.map(user => user.uid);

					return combineLatest(
						of(users),
						combineLatest(
							userIDs.map(userID =>
								this.firestore.collection<ServiceProvider>('services', ref => ref.where('userID', '==', userID)).valueChanges().pipe(
									map(service => service[0])
								)
							)
						)
					)
				}),
				map(([users, services]) => {

					return users.map(user => {
						return {
							user,
							service: services.find(service => service && (service['userID'] === user.uid)) // TODO: nees to remove ['']
						}
					})
				})
			);
	}

	post(user: User): Promise<void> {
		return this.firestore.doc(`${this.collection}/${user.uid}`).set(user);
	}

	update(user: User): boolean {
		return false;
	}

	delete(id: number): boolean {
		return false;
	}
}
