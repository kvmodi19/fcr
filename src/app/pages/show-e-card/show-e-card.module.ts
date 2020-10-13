import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowECardPageRoutingModule } from './show-e-card-routing.module';

import { ShowECardPage } from './show-e-card.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowECardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ShowECardPage]
})
export class ShowECardPageModule {}
