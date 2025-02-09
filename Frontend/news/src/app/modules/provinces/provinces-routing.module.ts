import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvincesComponent } from './provinces.component';

const routes: Routes = [{ path: '', component: ProvincesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvincesRoutingModule { }
