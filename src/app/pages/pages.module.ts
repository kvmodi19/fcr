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
