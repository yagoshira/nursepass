import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarPage } from './consultar.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarPageRoutingModule {}
