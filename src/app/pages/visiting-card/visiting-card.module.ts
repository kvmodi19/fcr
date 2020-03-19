import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitingCardPageRoutingModule } from './visiting-card-routing.module';

import { VisitingCardPage } from './visiting-card.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		VisitingCardPageRoutingModule
	],
	declarations: [ VisitingCardPage ]
})
export class VisitingCardPageModule {
}
