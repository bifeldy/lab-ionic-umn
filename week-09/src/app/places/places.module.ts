import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlacesRoutingModule } from './places.router.module';

import { PlacesPage } from './places.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlacesRoutingModule
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
