import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoCadPage } from './solicitacao-cad.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoCadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoCadPageRoutingModule {}
