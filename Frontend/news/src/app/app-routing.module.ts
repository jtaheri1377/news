import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'manage',
    loadChildren: () =>
      import('./modules/manage/manage.module').then((m) => m.ManageModule),
  },
  { path: 'meetings', loadChildren: () => import('./modules/meeting/meeting.module').then(m => m.MeetingModule) },
  { path: '**', redirectTo: '', pathMatch:'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
