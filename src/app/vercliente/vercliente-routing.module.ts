import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerclientePage } from './vercliente.page';

const routes: Routes = [
  {
    path: '',
    component: VerclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerclientePageRoutingModule {}
