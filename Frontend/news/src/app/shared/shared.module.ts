import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBannerSwiperComponent } from './components/header-banner-swiper/header-banner-swiper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatFormFieldModule,
  MatError,
  MatHint,
  MatSuffix,
} from '@angular/material/form-field';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { LessTabHeaderDirective } from './directives/less-tab-header.directive';
import { NewsSummaryItemComponent } from './components/news-summary-item/news-summary-item.component';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { NavHeadersComponent } from './components/nav-headers/nav-headers.component';
import { NavSubHeadersComponent } from './components/nav-headers/nav-sub-headers/nav-sub-headers.component';
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
];

@NgModule({
  declarations: [
    HeaderBannerSwiperComponent,
    LessTabHeaderDirective,
    NewsSummaryItemComponent,
    NewsContainerComponent,
    NavHeadersComponent,
    NavSubHeadersComponent,
  ],
  imports: [CommonModule, materials, ReactiveFormsModule],
  exports: [
    materials,
    HeaderBannerSwiperComponent,
    ReactiveFormsModule,
    FormsModule,
    LessTabHeaderDirective,
    NewsSummaryItemComponent,
    NewsContainerComponent,
    NavHeadersComponent,
    NavSubHeadersComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
