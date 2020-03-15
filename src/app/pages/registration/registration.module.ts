import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../components/logo/logo.component';
import { MaterialModule } from '../../material.module';

@NgModule({
	declarations: [
		RegistrationComponent,
		LogoComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
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
