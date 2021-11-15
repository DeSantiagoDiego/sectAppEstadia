import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardPagesGuard } from './guards/guard-pages.guard';

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
    path: 'inicio',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'mensajeria',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule)
  },
  {
    path: 'cotizaciones',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./cotizaciones/cotizaciones.module').then( m => m.CotizacionesPageModule)
  },
  {
    path: 'infoclientes',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./infoclientes/infoclientes.module').then( m => m.InfoclientesPageModule)
  },
  {
    path: 'listadoclientes',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./listadoclientes/listadoclientes.module').then( m => m.ListadoclientesPageModule)
  },
  {
    path: 'crearcliente',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./crearcliente/crearcliente.module').then( m => m.CrearclientePageModule)
  },
  {
    path: 'editcliente/:id',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./crearcliente/crearcliente.module').then( m => m.CrearclientePageModule)
  },
  {
    path: 'crear-cotizacion',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./crear-cotizacion/crear-cotizacion.module').then( m => m.CrearCotizacionPageModule)
  },
  {
    path: 'vercliente/:id',
    canActivate:[GuardPagesGuard],
    loadChildren: () => import('./vercliente/vercliente.module').then( m => m.VerclientePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'olvido-contrasena',
    loadChildren: () => import('./olvido-contra/olvido-contra.module').then( m => m.OlvidoContraPageModule)
  },
  {
    path: 'createaccount',
    loadChildren: () => import('./createaccount/createaccount.module').then( m => m.CreateaccountPageModule)
  },
  {
    path: 'verification-email',
    loadChildren: () => import('./send-email/send-email.module').then( m => m.SendEmailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
