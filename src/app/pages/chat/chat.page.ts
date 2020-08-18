import { Component } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatApiService } from 'src/app/services/api/chat.api.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

	user: User;
	list: any;

	constructor(
		private authenticationServie: AuthenticationService,
		private chatService: ChatApiService,
	) { }

	ionViewWillEnter() {
		this.user = this.authenticationServie.getUser();
		this.chatService.getUserChatList(this.user['_id'])
			.then((data) => {
				this.list = data;
				debugger
			}).catch((error) => {
				console.log(error);
			});
	}

}
