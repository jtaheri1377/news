import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewsComponent } from './interviews.component';
import { SubNewsComponent } from '../../shared/components/news-container/sub-news/sub-news.component';
import { AllInterviewsComponent } from './components/all-interviews/all-interviews.component';

const routes: Routes = [
  { path: '', component: AllInterviewsComponent },
  { path: ':slug', component: SubNewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewsRoutingModule { }
