import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AkhbarDigarComponent } from './akhbar-digar.component';
import { NewsVeiwerComponent } from '../../shared/components/news-veiwer/news-veiwer.component';
import { SubNewsComponent } from '../../shared/components/news-container/sub-news/sub-news.component';


const routes: Routes = [
  {
    path: '',
    component: AkhbarDigarComponent,
    children: [
      { path: '', pathMatch: 'full', component: AkhbarDigarComponent },
      { path: ':slug/:id', component: NewsVeiwerComponent },
      { path: ':slug', component: SubNewsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AkhbarDigarRoutingModule { }
