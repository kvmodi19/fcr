import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import { VisitingCardPage } from './visiting-card.page';

const routes: Routes = [
	{
		path: '',
		component: VisitingCardPage
	},
	{
		path: ':id',
		component: VisitingCardPage
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class VisitingCardPageRoutingModule {
}
