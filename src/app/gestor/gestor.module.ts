import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { gestorPageRoutingModule } from './gestor-routing.module';

import { gestorPage } from './gestor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    gestorPageRoutingModule
  ],
  declarations: [gestorPage]
})
export class gestorPageModule {}
