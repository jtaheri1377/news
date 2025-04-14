import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBannerSwiperComponent } from './components/header-banner-swiper/header-banner-swiper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatFormFieldModule,
  MatError,
  MatHint,
  MatSuffix,
} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { LessTabHeaderDirective } from './directives/less-tab-header.directive';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { NavHeadersComponent } from './components/nav-headers/nav-headers.component';
import { NavSubHeadersComponent } from './components/nav-headers/nav-sub-headers/nav-sub-headers.component';
import { NewsCard1Component } from './components/news-card1/news-card1.component';

import { NewsCard2Component } from './components/news-card2/news-card2.component';
import { RouterModule } from '@angular/router';
import { SkeletonCard1Component } from './components/skeletons/skeleton-card1/skeleton-card1.component';
import { SkeletonCard2Component } from './components/skeletons/skeleton-card2/skeleton-card2.component';
import { SubNewsComponent } from './components/news-container/sub-news/sub-news.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ScrollTriggerDirective } from './directives/scroll-trigger.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ClickOutSideDirective } from './directives/click-out-side.directive';
import { NewsItemSliderComponent } from './components/news-item-slider/news-item-slider.component';
import { NewsCard3Component } from './components/news-card3/news-card3.component';
import { NewsVeiwerComponent } from './components/news-veiwer/news-veiwer.component';
const materials = [
  MatIconModule,
  MatButtonModule,
  MatIconButton,
  MatFormFieldModule,
  MatError,
  MatInputModule,
  MatHint,
  MatSuffix,
  MatTabsModule,
  MatTabGroup,
  MatSelectModule,
  ScrollingModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    HeaderBannerSwiperComponent,
    LessTabHeaderDirective,
    NewsContainerComponent,
    NavHeadersComponent,
    NavSubHeadersComponent,
    NewsCard1Component,
    NewsCard2Component,
    SkeletonCard1Component,
    SkeletonCard2Component,
    SubNewsComponent,
    TimeAgoPipe,
    ScrollTriggerDirective,
    ClickOutSideDirective,
    NewsItemSliderComponent,
    NewsCard3Component,
    NewsVeiwerComponent,
  ],
  imports: [CommonModule, materials, RouterModule, ReactiveFormsModule],
  exports: [
    materials,
    HeaderBannerSwiperComponent,
    ReactiveFormsModule,
    FormsModule,
    LessTabHeaderDirective,
    NewsContainerComponent,
    NavHeadersComponent,
    NavSubHeadersComponent,
    NewsCard1Component,
    NewsCard2Component,
    SubNewsComponent,
    TimeAgoPipe,
    ScrollTriggerDirective,
    NewsItemSliderComponent,
    NewsVeiwerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
