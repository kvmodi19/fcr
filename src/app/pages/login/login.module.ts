import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { MaterialModule } from '../../material.module';

@NgModule({
	declarations: [
		LoginComponent,
		LogoComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		RouterModule.forChild([
			{
				path: '',
				component: LoginComponent,
			},
		]),
	],
})
export class LoginModule {
}
