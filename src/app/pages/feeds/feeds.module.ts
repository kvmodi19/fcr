import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { FeedsPageRoutingModule } from './feeds-routing.module';
import { FeedsPage } from './feeds.page';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { NotificatonService } from 'src/app/services/notification/notificaton.service';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		FeedsPageRoutingModule,
		ComponentsModule
	],
	declarations: [
		FeedsPage,
		SearchModalComponent
	],
	entryComponents: [
		SearchModalComponent,
		NotificationsComponent
	],
	providers: [
		NotificatonService
	]
})
export class FeedsPageModule {
}
