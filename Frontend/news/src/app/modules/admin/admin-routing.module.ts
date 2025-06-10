import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NewsFormComponent } from './news/components/news-form/news-form.component';
import { StoryFormComponent } from './story/components/story-form/story-form.component';
import { WiseFormComponent } from './wise/components/wise-form/wise-form.component';
import { BannerFormComponent } from './banner/components/banner-form/banner-form.component';
import { SiteFileFormComponent } from './site-file/components/site-file-form/site-file-form.component';
import { StoryListComponent } from './story/components/story-list/story-list.component';
import { AdminNewsListComponent } from './news/components/admin-news-list/admin-news-list.component';
import { WiseListComponent } from './wise/components/wise-list/wise-list.component';
import { AdminProvinceFormComponent } from './province/components/admin-province-form/admin-province-form.component';
import { AdminProvinceComponent } from './province/components/admin-province/admin-province.component';
import { RolesComponent } from './manage/roles/roles.component';
import { UsersComponent } from './manage/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'news/save', component: NewsFormComponent },
      { path: 'news', component: AdminNewsListComponent },
      { path: 'story/save', component: StoryFormComponent },
      { path: 'story', component: StoryListComponent },
      { path: 'wise/save', component: WiseFormComponent },
      { path: 'wise', component: WiseListComponent },
      { path: 'file', component: SiteFileFormComponent },
      { path: 'banner', component: BannerFormComponent },
      { path: 'province', component: AdminProvinceComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
