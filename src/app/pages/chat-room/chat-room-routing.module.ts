import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import { ChatRoomPage } from './chat-room.page';

const routes: Routes = [
	{
		path: ':id',
		component: ChatRoomPage
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class ChatRoomPageRoutingModule {
}
