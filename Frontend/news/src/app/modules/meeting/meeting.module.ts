import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { SharedModule } from '../../shared/shared.module';
import { MeetingNavsComponent } from './components/meeting-navs/meeting-navs.component';
import { MeetingsComponent } from './components/meetings/meetings.component';

@NgModule({
  declarations: [MeetingComponent, MeetingNavsComponent, MeetingsComponent],
  imports: [CommonModule, MeetingRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MeetingModule {}
