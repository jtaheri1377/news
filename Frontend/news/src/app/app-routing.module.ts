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
  {
    path: 'jalasat',
    loadChildren: () =>
      import('./modules/meeting/meeting.module').then((m) => m.MeetingModule),
  },
  {
    path: 'interviews',
    loadChildren: () =>
      import('./modules/interviews/interviews.module').then(
        (m) => m.InterviewsModule
      ),
  },
  {
    path: 'commissions',
    loadChildren: () =>
      import('./modules/units/units.module').then((m) => m.UnitsModule),
  },
  {
    path: 'wises',
    loadChildren: () =>
      import('./modules/wises/wises.module').then((m) => m.WisesModule),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./modules/gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'provinces',
    loadChildren: () =>
      import('./modules/provinces/provinces.module').then(
        (m) => m.ProvincesModule
      ),
  },
  {
    path: 'contactUs',
    loadChildren: () =>
      import('./modules/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: 'messenger',
    loadChildren: () =>
      import('./modules/messenger/messenger.module').then(
        (m) => m.MessengerModule
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
