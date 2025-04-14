import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavsComponent } from './components/admin-navs/admin-navs.component';
import { NewsFormComponent } from './news/components/news-form/news-form.component';
import { StoryFormComponent } from './story/components/story-form/story-form.component';
import { WiseFormComponent } from './components/wise-form/wise-form.component';
import { RuleFormComponent } from './components/rule-form/rule-form.component';
import { SliderFormComponent } from './components/slider-form/slider-form.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { SharedModule } from '../../shared/shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NewsEditorComponent } from './components/news-editor/news-editor.component';
import { MessengerModule } from '../messenger/messenger.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavsComponent,
    NewsFormComponent,
    StoryFormComponent,
    WiseFormComponent,
    RuleFormComponent,
    SliderFormComponent,
    ImageFormComponent,
    NewsEditorComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, EditorModule,MessengerModule],
})
export class AdminModule {}
