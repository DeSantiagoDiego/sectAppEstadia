import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvidoContraPageRoutingModule } from './olvido-contra-routing.module';

import { OlvidoContraPage } from './olvido-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvidoContraPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OlvidoContraPage]
})
export class OlvidoContraPageModule {}
