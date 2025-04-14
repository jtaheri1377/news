import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NewsFormComponent } from './news/components/news-form/news-form.component';
import { StoryFormComponent } from './story/components/story-form/story-form.component';
import { WiseFormComponent } from './components/wise-form/wise-form.component';
import { RuleFormComponent } from './components/rule-form/rule-form.component';
import { SliderFormComponent } from './components/slider-form/slider-form.component';
import { ImageFormComponent } from './components/image-form/image-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'news', component: NewsFormComponent },
      { path: 'story', component: StoryFormComponent },
      { path: 'wise', component: WiseFormComponent },
      { path: 'rule', component: RuleFormComponent },
      { path: 'slider', component: SliderFormComponent },
      { path: 'image', component: ImageFormComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
