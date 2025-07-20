import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AkhbarDigarRoutingModule } from './akhbar-digar-routing.module';
import { AkhbarDigarComponent } from './akhbar-digar.component';


@NgModule({
  declarations: [
    AkhbarDigarComponent
  ],
  imports: [
    CommonModule,
    AkhbarDigarRoutingModule
  ]
})
export class AkhbarDigarModule { }
