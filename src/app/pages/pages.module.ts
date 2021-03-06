import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: 'home',
				canActivate: [AuthGuard],
				loadChildren: () => import('./home/home.module').then(
					m => m.HomePageModule),
			},
			{
				path: 'login',
				loadChildren: () => import('./login/login.module').then(
					m => m.LoginModule),
			},
			{
				path: 'loading',
				loadChildren: () => import('./loading/loading.module').then(
					m => m.LoadingModule),
			},
			{
				path: 'register',
				loadChildren: () => import('./registration/registration.module').then(
					m => m.RegistrationModule),
			},
			{
				path: 'service-provider-detail',
				canActivate: [AuthGuard],
				loadChildren: () => import('./service-provider-detail/service-provider-detail.module').then(m => m.ServiceProviderDetailPageModule)
			},
			{
				path: 'show-e-card',
				canActivate: [AuthGuard],
				loadChildren: () => import('./show-e-card/show-e-card.module').then(m => m.ShowECardPageModule)
			},
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
		]),
	],
})
export class PagesModule {
}
