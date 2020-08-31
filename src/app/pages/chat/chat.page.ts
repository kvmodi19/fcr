import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';

import { User } from 'src/app/models/users.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatApiService } from 'src/app/services/api/chat.api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

	user: User;
	list: any;
	avatarBaseUrl = environment.avatarBaseUrl;

	constructor(
		private navCtrl: NavController,
		private authenticationServie: AuthenticationService,
		private chatService: ChatApiService,
	) { }

	ionViewWillEnter() {
		this.user = this.authenticationServie.getUser();
		this.chatService.getUserChatList(this.user['_id'])
			.then((data) => {
				this.list = data;
			}).catch((error) => {
				console.log(error);
			});
	}

	navigate(item) {
		(this.navCtrl as any).navigateForward([
			'home',
			'chat-room',
			item.to['_id']
		]);
	}

}
