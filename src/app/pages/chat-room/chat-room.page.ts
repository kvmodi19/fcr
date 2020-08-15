import { Component } from '@angular/core';
import {
	ActivatedRoute,
	Router
} from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Rx';
import { User } from 'src/app/models/users.model';
import { UsersApiService } from 'src/app/services/api/users.api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-chat-room',
	templateUrl: './chat-room.page.html',
	styleUrls: [ './chat-room.page.scss' ],
})
export class ChatRoomPage {

	messages = [];
	nickname = '';
	message = '';
	user: User;
	shopKeeperDetail: User;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private socket: Socket,
		private toastCtrl: ToastController,
		private userService: UsersApiService,
		private authenticationServie: AuthenticationService,
	) {

		this.route.params.subscribe((params: { id: string }) => {
			this.nickname = params.id;
			this.userService.getById(params.id)
				.then((response: User) => {
					console.log(response);
					this.socket.connect();
					this.socket.emit(
						'set-user',
						(response as any)._id
					);
					this.shopKeeperDetail = response;
					this.user = this.authenticationServie.getUser();
				})
				.catch((error) => {
					console.log(error);
				});
		});
		this.getMessages()
			.subscribe(
				message => {
					this.messages.push(message);
				});

		this.getUsers()
			.subscribe(
				data => {
					const user = data[ 'user' ];
					if (data[ 'event' ] === 'left') {
						this.showToast('User left: ' + user);
					} else {
						this.showToast('User joined: ' + user);
					}
				});
	}

	sendMessage() {
		this.socket.emit(
			'add-message',
			{ message: this.message, from: this.user['_id'], to: this.shopKeeperDetail['_id'] }
		);
		this.message = '';
	}

	getMessages() {
		const observable = new Observable(
			observer => {
				this.socket.on(
					'message',
					(data) => {
						observer.next(data);
					}
				);
			});
		return observable;
	}

	getUsers() {
		const observable = new Observable(
			observer => {
				this.socket.on(
					'users-changed',
					(data) => {
						observer.next(data);
					}
				);
			});
		return observable;
	}

	ionViewWillLeave() {
		this.socket.disconnect();
	}

	async showToast(msg) {
		const toast = await this.toastCtrl.create({
			message: msg,
			duration: 2000
		});
		toast.present();
	}

}
