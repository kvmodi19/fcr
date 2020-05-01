import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { FeedsPageRoutingModule } from './feeds-routing.module';
import { FeedsPage } from './feeds.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		FeedsPageRoutingModule
	],
	declarations: [
		FeedsPage,
		SearchModalComponent
	],
	entryComponents: [ SearchModalComponent ]
})
export class FeedsPageModule {
}
