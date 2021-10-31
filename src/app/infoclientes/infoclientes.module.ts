import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoclientesPageRoutingModule } from './infoclientes-routing.module';

import { InfoclientesPage } from './infoclientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoclientesPageRoutingModule
  ],
  declarations: [InfoclientesPage]
})
export class InfoclientesPageModule {}
