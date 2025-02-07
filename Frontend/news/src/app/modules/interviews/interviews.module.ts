import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';
import { InterviewsNavsComponent } from './components/interviews-navs/interviews-navs.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    InterviewsComponent,
    InterviewsNavsComponent
  ],
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    SharedModule
  ]
})
export class InterviewsModule { }
