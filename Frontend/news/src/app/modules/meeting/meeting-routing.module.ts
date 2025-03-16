import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { SubNewsComponent } from '../../shared/components/news-container/sub-news/sub-news.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingComponent,
    children: [
      { path: '', pathMatch: 'full', component: MeetingsComponent },
      { path: ':slug', component: SubNewsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingRoutingModule {}
