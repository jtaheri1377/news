import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './meeting.component';
import { SharedModule } from '../../shared/shared.module';
import { MeetingNavsComponent } from './components/meeting-navs/meeting-navs.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { GroupNewsComponent } from './components/group-news/group-news.component';


@NgModule({
  declarations: [
    MeetingComponent,
    MeetingNavsComponent,
    MeetingsComponent,
    GroupNewsComponent
  ],
  imports: [
    CommonModule,
    MeetingRoutingModule,
    SharedModule
  ]
})
export class MeetingModule { }
