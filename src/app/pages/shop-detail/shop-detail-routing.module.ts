import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import { ShopDetailPage } from './shop-detail.page';

const routes: Routes = [
	{
		path: '',
		component: ShopDetailPage
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class ShopDetailPageRoutingModule {
}
