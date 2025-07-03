import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { StoryComponent } from './components/stories/story/story.component';
import { ShadowSliderComponent } from './components/shadow-slider/shadow-slider.component';
import { NewsComponent } from './components/news/news.component';
import { LinksComponent } from './components/links/links.component';
// import { StoryViewerComponent } from './components/stories/story/story-viewer/story-viewer.componentt
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoryViewerComponent } from './components/stories/story-viewer/story-viewer.component';
import { LinkLineComponent } from './components/link-line/link-line.component';

@NgModule({
  declarations: [
    HomeComponent,
    StoryComponent,
    ShadowSliderComponent,
    NewsComponent,
    LinksComponent,
    StoryViewerComponent,
    LinkLineComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatProgressBarModule,
  ],
  exports: [LinksComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
