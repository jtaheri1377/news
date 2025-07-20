import {
  Component,
  Input,
  OnInit,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { BannerService } from '../../services/banner.service';

import { Subscription } from 'rxjs';

import { NewsCategory } from '../../../core/constants/news-categories';

import { Banner } from '../../../core/models/banner/banner.model';

import { NewsCategoryService } from '../../../core/constants/services/news-category.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header-banner-swiper',
  standalone: false,
  templateUrl: './header-banner-swiper.component.html',
  styleUrl: './header-banner-swiper.component.scss',
})
export class HeaderBannerSwiperComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  isLoading: boolean = false;
  items: Banner[] = [];
  isBrowser = false;
  @Input() newsCategory: NewsCategory | null = null;
  @ViewChild('swiperContainer') swiperContainerRef!: ElementRef<HTMLElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: BannerService,
    private newsCategoryService: NewsCategoryService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory) {
      var sub = this.service
        .getBannerByCategoryId(this.newsCategory.id)
        .subscribe({
          next: (result: Banner[]) => {
            this.items = result;
            this.isLoading = false;

            if (this.isBrowser && this.items.length > 0) {
              setTimeout(() => {
                if (this.swiperContainerRef) {
                  const swiperEl = this.swiperContainerRef.nativeElement as any;
                  if (swiperEl && swiperEl.swiper) {
                    if (
                      swiperEl.swiper.autoplay &&
                      !swiperEl.swiper.autoplay.running
                    ) {
                      swiperEl.swiper.autoplay.start();
                    }
                    swiperEl.swiper.update();
                  }
                }
              }, 0);
            }
          },
          error: (error) => {
            this.isLoading = false;
          },
        });
      this.subs.push(sub);
    } else {
      this.isLoading = false;
    }
  }

  goToNews(item: any) {
    var routeSlug =
      this.newsCategoryService.findPathByValue(item.categoryId)?.path ?? '';
    this.router.navigate([routeSlug, item.newsId]);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
