import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotghComponent } from './notgh.component';
import { SubNewsComponent } from '../../shared/components/news-container/sub-news/sub-news.component';
import { NewsVeiwerComponent } from '../../shared/components/news-veiwer/news-veiwer.component';

const routes: Routes = [
  {
    path: '',
    component: NotghComponent,
    children: [
      { path: '', pathMatch: 'full', component: NotghComponent },
      { path: ':slug/:id', component: NewsVeiwerComponent },
      { path: ':slug', component: SubNewsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotghRoutingModule {}
