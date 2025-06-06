import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotghRoutingModule } from './notgh-routing.module';
import { NotghComponent } from './notgh.component';


@NgModule({
  declarations: [
    NotghComponent
  ],
  imports: [
    CommonModule,
    NotghRoutingModule
  ]
})
export class NotghModule { }
