import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitingCardPageRoutingModule } from './visiting-card-routing.module';

import { VisitingCardPage } from './visiting-card.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		VisitingCardPageRoutingModule,
		ComponentsModule
	],
	declarations: [ VisitingCardPage ]
})
export class VisitingCardPageModule {
}
