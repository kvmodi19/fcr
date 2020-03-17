import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LogoComponent } from '../../components/logo/logo.component';
import { LoadingComponent } from './loading.component';

@NgModule({
	declarations: [
		LoadingComponent,
		LogoComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild([
			{
				path: '',
				component: LoadingComponent,
			},
		]),
	],
})
export class LoadingModule {
}
