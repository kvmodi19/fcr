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
				canActivate: [ AuthGuard ],
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
				path: 'chat-room',
				loadChildren: () => import('./chat-room/chat-room.module').then(
					m => m.ChatRoomPageModule)
			},
			{
				path: 'shop-detail',
				loadChildren: () => import('./shop-detail/shop-detail.module').then( m => m.ShopDetailPageModule)
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
