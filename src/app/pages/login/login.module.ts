import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { LogoComponent } from '../../components/logo/logo.component';

@NgModule({
	declarations: [
		LoginComponent,
		LogoComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
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
