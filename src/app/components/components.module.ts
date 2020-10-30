import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ECardComponent } from './e-card/e-card.component';
import { NotificationsComponent } from './notifications/notifications.component';

const components = [ 
	LogoComponent,
	ECardComponent,
	NotificationsComponent
];

@NgModule({
	declarations: components,
	exports: components,
	imports: [
		CommonModule,
		IonicModule,
		RouterModule
	]
})
export class ComponentsModule {
}
