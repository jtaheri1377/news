import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoftogooRoutingModule } from './goftogoo-routing.module';
import { GoftogooComponent } from './goftogoo.component';


@NgModule({
  declarations: [
    GoftogooComponent
  ],
  imports: [
    CommonModule,
    GoftogooRoutingModule
  ]
})
export class GoftogooModule { }
