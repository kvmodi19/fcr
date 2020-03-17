import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LogoComponent } from '../../components/logo/logo.component';
import { RegistrationComponent } from './registration.component';

@NgModule({
	declarations: [
		RegistrationComponent,
		LogoComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild([
			{
				path: '',
				component: RegistrationComponent,
			},
		]),
	],
})
export class RegistrationModule {
}
