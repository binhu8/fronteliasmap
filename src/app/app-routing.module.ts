import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'map/:rede', loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule) }, { path: 'cadastrar/:opcao', loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
