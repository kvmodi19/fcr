import { NgModule } from '@angular/core';
import {
	Routes,
	RouterModule
} from '@angular/router';

import { FeedsPage } from './feeds.page';

const routes: Routes = [
	{
		path: '',
		component: FeedsPage,
		children: [
			{
				path: 'chat',
				loadChildren: () => import('../chat/chat.module').then(
					m => m.ChatPageModule)
			},
			{
				path: 'reward',
				loadChildren: () => import('../reward/reward.module').then(
					m => m.RewardPageModule)
			},
			{
				path: 'visiting-card',
				loadChildren: () => import('../visiting-card/visiting-card.module').then(
					m => m.VisitingCardPageModule)
			},
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class FeedsPageRoutingModule {
}
