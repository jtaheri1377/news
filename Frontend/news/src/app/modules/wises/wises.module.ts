import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WisesRoutingModule } from './wises-routing.module';
import { WisesComponent } from './wises.component';
import { WiseItemComponent } from './components/wise-container/wise-item/wise-item.component';
import { SharedModule } from '../../shared/shared.module';
import { WiseContainerComponent } from './components/wise-container/wise-container.component';


@NgModule({
  declarations: [
    WisesComponent,
    WiseItemComponent,
    WiseContainerComponent
  ],
  imports: [
    CommonModule,
    WisesRoutingModule,
    SharedModule
  ],
  exports:[WiseContainerComponent]
})
export class WisesModule { }
