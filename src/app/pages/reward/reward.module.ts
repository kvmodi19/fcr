import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRewardModalComponent } from 'src/app/components/add-reward-modal/add-reward-modal.component';
import { RewardPageRoutingModule } from './reward-routing.module';
import { RewardPage } from './reward.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RewardPageRoutingModule
	],
	declarations: [
		RewardPage,
		AddRewardModalComponent
	],
	entryComponents: [
		AddRewardModalComponent
	]
})
export class RewardPageModule {
}
