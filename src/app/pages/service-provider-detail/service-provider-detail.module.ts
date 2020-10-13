import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderDetailPageRoutingModule } from './service-provider-detail-routing.module';

import { ServiceProviderDetailPage } from './service-provider-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
		ServiceProviderDetailPageRoutingModule
	],
	declarations: [ ServiceProviderDetailPage ]
})
export class ServiceProviderDetailPageModule {
}
