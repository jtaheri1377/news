import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BayaniyehRoutingModule } from './bayaniyeh-routing.module';
import { BayaniyehComponent } from './bayaniyeh.component';


@NgModule({
  declarations: [
    BayaniyehComponent
  ],
  imports: [
    CommonModule,
    BayaniyehRoutingModule
  ]
})
export class BayaniyehModule { }
