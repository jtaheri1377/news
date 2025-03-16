import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';
import { InterviewsNavsComponent } from './components/interviews-navs/interviews-navs.component';
import { SharedModule } from '../../shared/shared.module';
import { AllInterviewsComponent } from './components/all-interviews/all-interviews.component';


@NgModule({
  declarations: [
    InterviewsComponent,
    InterviewsNavsComponent,
    AllInterviewsComponent
  ],
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    SharedModule
  ]
})
export class InterviewsModule { }
