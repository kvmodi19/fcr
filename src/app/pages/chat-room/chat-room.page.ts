import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Rx';
import { User } from 'src/app/models/users.model';
import { UsersApiService } from 'src/app/services/api/users.api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatApiService } from 'src/app/services/api/chat.api.service';

@Component({
	selector: 'app-chat-room',
	templateUrl: './chat-room.page.html',
	styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage {

	messages = [];
	nickname = '';
	message = '';
	user: User;
	shopKeeperDetail: User;

	constructor(
		private route: ActivatedRoute,
		private socket: Socket,
		private userService: UsersApiService,
		private authenticationServie: AuthenticationService,
		private chatService: ChatApiService,
	) {

		this.route.params.subscribe((params: { id: string }) => {
			this.nickname = params.id;
			this.userService.getById(params.id)
				.valueChanges()
				.subscribe((response) => {
					this.socket.connect();
					this.socket.emit(
						'set-user',
						(response as any)._id
					);
					this.shopKeeperDetail = response;
					this.user = this.authenticationServie.getUser();
					this.chatService.getChatRoomData(this.user['_id'], this.shopKeeperDetail['_id'])
						.then((data) => {
							this.messages = data;
						}).catch((error) => {
							console.log(error);
						});
				})



		});
		this.getMessages()
			.subscribe(
				message => {
					this.messages.push(message);
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

	ionViewWillLeave() {
		this.socket.disconnect();
	}

}
