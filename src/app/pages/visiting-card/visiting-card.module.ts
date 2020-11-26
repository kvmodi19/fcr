import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductsModalComponent } from 'src/app/components/add-products-modal/add-products-modal.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { NotificatonService } from 'src/app/services/notification/notificaton.service';
import { VisitingCardPageRoutingModule } from './visiting-card-routing.module';
import { VisitingCardPage } from './visiting-card.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		VisitingCardPageRoutingModule,
		ComponentsModule
	],
	declarations: [
		VisitingCardPage,
		AddProductsModalComponent
	],
	entryComponents: [
		NotificationsComponent,
		AddProductsModalComponent
	],
	providers: [
		NotificatonService
	]
})
export class VisitingCardPageModule {
}
