import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingComponent } from './meeting.component';
import { GroupNewsComponent } from './components/group-news/group-news.component';
import { MeetingsComponent } from './components/meetings/meetings.component';

const routes: Routes = [
  {
    path: '',
    component: MeetingComponent,
    children: [
      { path: '', pathMatch: 'full', component: MeetingsComponent },
      { path: ':category', component: GroupNewsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingRoutingModule {}
