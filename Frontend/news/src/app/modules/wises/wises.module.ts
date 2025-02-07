import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WisesRoutingModule } from './wises-routing.module';
import { WisesComponent } from './wises.component';
import { WiseItemComponent } from './components/wise-item/wise-item.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    WisesComponent,
    WiseItemComponent
  ],
  imports: [
    CommonModule,
    WisesRoutingModule,
    SharedModule
  ]
})
export class WisesModule { }
