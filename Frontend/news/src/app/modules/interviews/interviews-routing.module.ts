import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewsComponent } from './interviews.component';
import { AllInterviewsComponent } from './components/all-interviews/all-interviews.component';
import { SubNewsComponent } from '../../shared/components/news-container/sub-news/sub-news.component';
import { NewsVeiwerComponent } from '../../shared/components/news-veiwer/news-veiwer.component';

const routes: Routes = [
  { path: '', component: AllInterviewsComponent },
  { path: ':slug/:id', component: NewsVeiwerComponent },
  { path: ':slug', component: SubNewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewsRoutingModule {}
