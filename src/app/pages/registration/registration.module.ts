import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RegistrationComponent } from './registration.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
	declarations: [
		RegistrationComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
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
