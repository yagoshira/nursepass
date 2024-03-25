import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoCadPageRoutingModule } from './solicitacao-cad-routing.module';

import { SolicitacaoCadPage } from './solicitacao-cad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoCadPageRoutingModule
  ],
  declarations: [SolicitacaoCadPage]
})
export class SolicitacaoCadPageModule {}
