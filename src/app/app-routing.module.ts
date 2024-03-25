import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'painel',
    loadChildren: () => import('./gestor/gestor.module').then( m => m.gestorPageModule)
  },
  {
    path: 'solicitante',
    loadChildren: () => import('./solicitante/solicitante.module').then( m => m.SolicitantePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'opcao',
    loadChildren: () => import('./opcao/opcao.module').then( m => m.OpcaoPageModule)
  },
  {
    path: 'solicitacao-cad',
    loadChildren: () => import('./solicitacao-cad/solicitacao-cad.module').then( m => m.SolicitacaoCadPageModule)
  },
  {
    path: 'atendimento',
    loadChildren: () => import('./atendimento/atendimento.module').then( m => m.AtendimentoPageModule)
  },
  {
    path: 'consultar',
    loadChildren: () => import('./consultar/consultar.module').then( m => m.ConsultarPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
