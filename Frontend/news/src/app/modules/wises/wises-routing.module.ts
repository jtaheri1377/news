import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WisesComponent } from './wises.component';

const routes: Routes = [{ path: '', component: WisesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WisesRoutingModule { }
