import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { gestorPage } from './gestor.page';

const routes: Routes = [
  {
    path: '',
    component: gestorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class gestorPageRoutingModule {}
