import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
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
export class HeaderBannerSwiperComponent implements OnInit {
  subs: Subscription[] = [];
  isLoading: boolean = false;
  items: Banner[] = [];
  isBrowser = false;
  @Input() newsCategory: NewsCategory | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: BannerService,
    private newsCategoryService: NewsCategoryService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  //  @Input('items') items = [
  //     {
  //       id: 0,
  //       img: '',
  //       title: '',
  //       studyTime: ' ',
  //       date: '',
  //     }

  //   ];

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory) {
      var sub = this.service
        .getBannerByCategoryId(this.newsCategory.id)
        .subscribe((result: Banner[]) => {
          // debugger;
          // this.items.push(...result.news);
          // this.items = [...this.items, ...result.list];
          this.items = result;
          // this.hasMore = result.hasMore;
          // this.newsCount += result.list.length;
          this.isLoading = false;
        });
      this.subs.push(sub);
    }
  }

  goToNews(id: number) {
    // if (!this.isSubnewsPage) {
    var routeSlug = this.newsCategory!.slug;
    console.log(this.newsCategoryService.findPathByValue(routeSlug)?.path);
    const path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
    this.router.navigate([path, id]);
    // }
  }

  // getMore() {
  //   this.isLoading = true;
  //   var sub = this.service
  //     .getNews(this.heading.ctgId, this.newsCount, 1)
  //     .subscribe((result: NewsResponse) => {
  //       this.isLoading = false;
  //       this.items.push(...result.news);
  //       this.hasMore = result.hasMore;
  //       this.newsCount += 1;
  //     });
  //   this.subs.push(sub);
  // }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
