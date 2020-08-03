import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopDetailPageRoutingModule } from './shop-detail-routing.module';

import { ShopDetailPage } from './shop-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
		ShopDetailPageRoutingModule
	],
	declarations: [ ShopDetailPage ]
})
export class ShopDetailPageModule {
}
