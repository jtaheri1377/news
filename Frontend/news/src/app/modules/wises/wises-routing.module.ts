import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WisesComponent } from './wises.component';
import { WiseDetailComponent } from '../admin/wise/components/wise-detail/wise-detail.component';

const routes: Routes = [
  { path: ':id', component: WiseDetailComponent },
  { path: '', component: WisesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WisesRoutingModule {}
