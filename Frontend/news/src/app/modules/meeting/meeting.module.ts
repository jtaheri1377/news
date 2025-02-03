import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MeetingComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    SharedModule
  ]
})
export class MeetingModule { }
