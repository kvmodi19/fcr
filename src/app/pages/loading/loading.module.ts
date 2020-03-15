import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../components/logo/logo.component';
import { MaterialModule } from '../../material.module';

@NgModule({
	declarations: [
		LoadingComponent,
		LogoComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
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
