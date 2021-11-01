import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoclientesPage } from './listadoclientes.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoclientesPageRoutingModule {}
