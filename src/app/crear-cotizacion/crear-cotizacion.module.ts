import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCotizacionPageRoutingModule } from './crear-cotizacion-routing.module';

import { CrearCotizacionPage } from './crear-cotizacion.page';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCotizacionPageRoutingModule,
  ],
  declarations: [CrearCotizacionPage]
})
export class CrearCotizacionPageModule {}
