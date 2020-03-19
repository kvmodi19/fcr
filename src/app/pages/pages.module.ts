import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
			},
			{
				path: 'login',
				loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
			},
			{
				path: 'loading',
				loadChildren: () => import('./loading/loading.module').then(m => m.LoadingModule),
			},
			{
				path: 'register',
				loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
			}
		]),
	],
})
export class PagesModule {
}
