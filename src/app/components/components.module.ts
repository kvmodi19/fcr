import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ECardComponent } from './e-card/e-card.component';
import { CommonModule } from '@angular/common';

const components = [ 
	LogoComponent,
	ECardComponent
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
