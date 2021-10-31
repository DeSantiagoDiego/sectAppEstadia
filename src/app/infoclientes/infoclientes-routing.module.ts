import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoclientesPage } from './infoclientes.page';

const routes: Routes = [
  {
    path: '',
    component: InfoclientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoclientesPageRoutingModule {}
