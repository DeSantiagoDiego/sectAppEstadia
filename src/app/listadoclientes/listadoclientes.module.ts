import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoclientesPageRoutingModule } from './listadoclientes-routing.module';

import { ListadoclientesPage } from './listadoclientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoclientesPageRoutingModule
  ],
  declarations: [ListadoclientesPage]
})
export class ListadoclientesPageModule {}
