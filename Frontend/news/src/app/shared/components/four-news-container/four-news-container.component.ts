import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  NewsCategories,
  NewsCategory,
} from '../../../core/constants/news-categories';
import { map, Subscription } from 'rxjs';
import { MeetingService } from '../../../modules/meeting/services/meeting.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsCategoryService } from '../../../core/constants/services/news-category.service';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import { DrawerPusherService } from '../../../layout/services/drawer-pusher.service';

@Component({
  selector: 'app-four-news-container',
  standalone: false,

  templateUrl: './four-news-container.component.html',
  styleUrl: './four-news-container.component.scss',
})
export class FourNewsContainerComponent implements OnInit, OnDestroy {
  @Input() newsCategory: NewsCategory | null = null;
  @Input() noHeading: boolean = false;
  @Input() noTitle: boolean = false;
  @Input() setProvince: boolean = false;
  @Input() noMoreButton: boolean = false;
  @Input('isSubnewsPage') isSubnewsPage: boolean = false;
  @Input() customStyles: string = '';
  @Input() itemsCount: number = 0;
  @Input() take: number = 0;

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  newsCount: number = 0;
  items: any[] = [];

  constructor(
    private service: MeetingService,
    private drawerService: DrawerPusherService,
    private router: Router,
    private route: ActivatedRoute,
    private newsCategoryService: NewsCategoryService
  ) {}

  ngOnInit(): void {
    if (this.newsCategory == null) {
      var sub = this.route.params
        .pipe(
          map((route: Params) => {
            var category = Object.values(NewsCategories).find(
              (x) => x.slug == route['slug']
            );
            this.newsCategory = category as NewsCategory;
            this.fetchNews();
          })
        )
        .subscribe(() => {});
      this.subs.push(sub);
    } else this.fetchNews();
    var sub1 = this.drawerService.provinceUpdate$.subscribe(() => {

      this.fetchNews();

    });
    this.subs.push(sub1);

    // this.cdr.markForCheck();
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory) {
      var provinceId=JSON.parse(localStorage.getItem('province')!).id?? 0;
      var sub = this.service
        .getNews(
          this.newsCategory.id,
          0,
          this.itemsCount == 0 ? 10 : this.itemsCount,
          this.setProvince?provinceId:0
        )
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          //
          // this.items.push(...result.news);
          // this.items = [...this.items, ...result.list];
          this.items = [...result.list];
          this.hasMore = result.hasMore;
          this.newsCount = result.list.length;
          this.isLoading = false;
        });
      this.subs.push(sub);
    }
  }

  goToSubnewsPage() {
    if (!this.isSubnewsPage) {
      var routeSlug = this.newsCategory!.slug;
      const path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
      this.router.navigate([path]);
    }
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
