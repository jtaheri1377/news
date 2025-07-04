import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsComponent } from './units.component';
import { UnitNavsComponent } from './components/unit-navs/unit-navs.component';
import { SharedModule } from '../../shared/shared.module';
import { AllUnitsComponent } from './components/all-units/all-units.component';
import { HomeModule } from '../home/home.module';


@NgModule({
  declarations: [
    UnitsComponent,
    UnitNavsComponent,
    AllUnitsComponent
  ],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    HomeModule,
    SharedModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UnitsModule { }
