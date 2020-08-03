import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage,
				children: [
					{
						path: 'feeds',
						loadChildren: () => import('../feeds/feeds.module').then(
							m => m.FeedsPageModule)
					},
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
		]),
	],
	declarations: [ HomePage ],
})
export class HomePageModule {
}
