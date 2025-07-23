import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
  { path: 'admin',
    canActivate:[authGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'rules', loadChildren: () => import('./modules/rules/rules.module').then(m => m.RulesModule) },
  { path: 'notgh', loadChildren: () => import('./modules/notgh/notgh.module').then(m => m.NotghModule) },
  { path: 'goftogoo', loadChildren: () => import('./modules/goftogoo/goftogoo.module').then(m => m.GoftogooModule) },
  { path: 'akhbar', loadChildren: () => import('./modules/akhbar-digar/akhbar-digar.module').then(m => m.AkhbarDigarModule) },
  { path: 'bayaniyeh', loadChildren: () => import('./modules/bayaniyeh/bayaniyeh.module').then(m => m.BayaniyehModule) },
  { path: 'note', loadChildren: () => import('./modules/note/note.module').then(m => m.NoteModule) },
  { path: '**', redirectTo: '', pathMatch: 'prefix' },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
