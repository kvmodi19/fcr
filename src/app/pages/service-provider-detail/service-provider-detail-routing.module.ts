import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import { ServiceProviderDetailPage } from './service-provider-detail.page';

const routes: Routes = [
	{
		path: '',
		component: ServiceProviderDetailPage
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class ServiceProviderDetailPageRoutingModule {
}
