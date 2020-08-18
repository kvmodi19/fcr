import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User } from '../../models/users.model';
import { Chat } from 'src/app/models/chat.model';

@Injectable({
	providedIn: 'root'
})
export class ChatApiService {

	chat = 'chat';
	url = `${environment.baseUrl}/${this.chat}`;

	constructor(private http: HttpClient) {
	}

	getChatRoomData(from, to): Promise<any> {
		return this.http.get(`${this.url}/${from}/${to}`).toPromise();
	}

	getUserChatList(userId): Promise<any> {
		return this.http.get(`${this.url}/list/${userId}`).toPromise();
	}
}
