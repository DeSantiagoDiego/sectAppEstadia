import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'mensajeria',
    loadChildren: () => import('./mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule)
  },
  {
    path: 'cotizaciones',
    loadChildren: () => import('./cotizaciones/cotizaciones.module').then( m => m.CotizacionesPageModule)
  },
  {
    path: 'infoclientes',
    loadChildren: () => import('./infoclientes/infoclientes.module').then( m => m.InfoclientesPageModule)
  },
  {
    path: 'listadoclientes',
    loadChildren: () => import('./listadoclientes/listadoclientes.module').then( m => m.ListadoclientesPageModule)
  },
  {
    path: 'crearcliente',
    loadChildren: () => import('./crearcliente/crearcliente.module').then( m => m.CrearclientePageModule)
  },
  {
    path: 'editcliente/:id',
    loadChildren: () => import('./crearcliente/crearcliente.module').then( m => m.CrearclientePageModule)
  },
  {
    path: 'crear-cotizacion',
    loadChildren: () => import('./crear-cotizacion/crear-cotizacion.module').then( m => m.CrearCotizacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
