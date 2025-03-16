import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsComponent } from './units.component';
import { SubNewsComponent } from '../../shared/components/news-container/sub-news/sub-news.component';
import { AllUnitsComponent } from './components/all-units/all-units.component';

const routes: Routes = [
  { path: '', component: AllUnitsComponent },
      { path: ':slug', component: SubNewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
