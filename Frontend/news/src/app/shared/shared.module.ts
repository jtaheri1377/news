import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBannerSwiperComponent } from './components/header-banner-swiper/header-banner-swiper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {
  MatFormFieldModule,
  MatError,
  MatHint,
  MatSuffix,
} from '@angular/material/form-field';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { LessTabHeaderDirective } from './directives/less-tab-header.directive';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { NavHeadersComponent } from './components/nav-headers/nav-headers.component';
import { NavSubHeadersComponent } from './components/nav-headers/nav-sub-headers/nav-sub-headers.component';
import { NewsCard1Component } from './components/news-card1/news-card1.component';

import { NewsCard2Component } from './components/news-card2/news-card2.component';
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
  MatSelectModule
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
  ],
  imports: [CommonModule, materials, ReactiveFormsModule],
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
