import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearclientePageRoutingModule } from './crearcliente-routing.module';

import { CrearclientePage } from './crearcliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearclientePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CrearclientePage]
})
export class CrearclientePageModule {}
