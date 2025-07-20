import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { FilterPlaceComponent } from './components/filter-place/filter-place.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ContactUsComponent,
    ContactItemComponent,
    FilterPlaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
