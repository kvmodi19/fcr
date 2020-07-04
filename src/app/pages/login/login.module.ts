import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ComponentsModule,
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
