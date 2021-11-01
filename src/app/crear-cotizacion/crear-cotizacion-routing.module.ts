import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearCotizacionPage } from './crear-cotizacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCotizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearCotizacionPageRoutingModule {}
