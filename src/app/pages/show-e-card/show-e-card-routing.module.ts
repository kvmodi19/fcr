import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowECardPage } from './show-e-card.page';

const routes: Routes = [
  {
    path: '',
    component: ShowECardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowECardPageRoutingModule {}
