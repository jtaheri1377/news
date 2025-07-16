import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavsComponent } from './components/admin-navs/admin-navs.component';
import { NewsFormComponent } from './news/components/news-form/news-form.component';
import { StoryFormComponent } from './story/components/story-form/story-form.component';
import { WiseFormComponent } from './wise/components/wise-form/wise-form.component';
import { SharedModule } from '../../shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';
import { MessengerModule } from '../messenger/messenger.module';
import { BannerFormComponent } from './banner/components/banner-form/banner-form.component';
import { AdminNewsListComponent } from './news/components/admin-news-list/admin-news-list.component';
import { AdminNewsListItemComponent } from './news/components/admin-news-list/admin-news-list-item/admin-news-list-item.component';
import { SiteFileFormComponent } from './site-file/components/site-file-form/site-file-form.component';
import { AdminUploadViewerComponent } from './components/admin-upload-viewer/admin-upload-viewer.component';
import { StoryListComponent } from './story/components/story-list/story-list.component';
import { WiseListComponent } from './wise/components/wise-list/wise-list.component';
import { WisesModule } from '../wises/wises.module';
import { AdminProvinceFormComponent } from './province/components/admin-province-form/admin-province-form.component';
// import { TreeViewComponent } from './province/components/tree-view/tree-view.component';
import { AdminProvinceComponent } from './province/components/admin-province/admin-province.component';
import { WiseDetailComponent } from './wise/components/wise-detail/wise-detail.component';
import { RolesComponent } from './manage/roles/roles.component';
import { UsersComponent } from './manage/users/users.component';
import { BannerListComponent } from './banner/components/banner-list/banner-list.component';
import { BannerItemComponent } from './banner/components/banner-list/banner-item/banner-item.component';
import { AdminUserFormComponent } from './manage/users/components/admin-user-form/admin-user-form.component';
import NgxMaskModule from 'ngx-mask';
import { AdminRoleFormComponent } from './manage/roles/components/admin-role-form/admin-role-form.component';
import { PermissionListComponent } from './manage/roles/components/permission-list/permission-list.component';
import { AdminPermissionFormComponent } from './manage/roles/components/admin-permission-form/admin-permission-form.component';
import { ProvinceSelectableListComponent } from './manage/roles/components/province-selectable-list/province-selectable-list.component';
// import { AdminPermissionComponent } from './manage/roles/services/admin-permission/admin-permission.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavsComponent,
    NewsFormComponent,
    StoryFormComponent,
    WiseFormComponent,
    NewsEditorComponent,
    BannerFormComponent,
    AdminNewsListComponent,
    AdminNewsListItemComponent,
    SiteFileFormComponent,
    AdminUploadViewerComponent,
    StoryListComponent,
    WiseListComponent,
    AdminProvinceFormComponent,
    // TreeViewComponent,
    AdminProvinceComponent,
    WiseDetailComponent,
    RolesComponent,
    UsersComponent,
    BannerListComponent,
    BannerItemComponent,
    AdminUserFormComponent,
    AdminRoleFormComponent,
    PermissionListComponent,
    AdminPermissionFormComponent,
    // AdminPermissionComponent
    ProvinceSelectableListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    WisesModule,
    EditorModule,
    MessengerModule,
  ],
})
export class AdminModule {}
