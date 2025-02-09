import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvincesRoutingModule } from './provinces-routing.module';
import { ProvincesComponent } from './provinces.component';
import { IranMapComponent } from './components/iran-map/iran-map.component';
import { SharedModule } from '../../shared/shared.module';
import { ProvincesSliderComponent } from './components/provinces-slider/provinces-slider.component';


@NgModule({
  declarations: [
    ProvincesComponent,
    IranMapComponent,
    ProvincesSliderComponent
  ],
  imports: [
    CommonModule,
    ProvincesRoutingModule,
    SharedModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProvincesModule { }
