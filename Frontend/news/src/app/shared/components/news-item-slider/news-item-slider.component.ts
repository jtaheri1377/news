import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import { NewsHeading } from '../../../core/models/News/newsHeading.model';
import { MeetingService } from '../../../modules/meeting/services/meeting.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsCategory } from '../../../core/constants/news-categories';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsCategoryService } from '../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-news-item-slider',
  standalone: false,

  templateUrl: './news-item-slider.component.html',
  styleUrl: './news-item-slider.component.scss',
  // encapsulation:ViewEncapsulation.ShadowDom
})
export class NewsItemSliderComponent implements OnInit, OnDestroy {
  @Input() newsCategory: NewsCategory | null = null;
  @Input() customStyles: string = '';
  @Input() breakPoints!: {};

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  newsCount: number = 0;
  items: any[] = [];
  @Input() noBackground: boolean = true;
  @Input() noHeading: boolean = false;
  @Input('isSubnewsPage') isSubnewsPage: boolean = false;

  constructor(
    private service: MeetingService,
    private router: Router,
    private newsCategoryService:NewsCategoryService
  ) {}

  ngOnInit(): void {
    // if (this.newsCategory == null) {
    //   this.route.params
    //     .pipe(
    //       map((route: Params) => {
    //         var category = Object.values(NewsCategories).find(
    //           (x) => x.slug == route['slug']
    //         );
    //         this.newsCategory =
    //           category as (typeof NewsCategories)[NewsCategoryKey];
    //         this.fetchNews();
    //       })
    //     )
    //     .subscribe(() => {});
    // } else
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory) {
      var sub = this.service
        .getNews(this.newsCategory.code, this.newsCount, 10)
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          // this.items.push(...result.news);
          // this.items = [...this.items, ...result.list];
          this.items = result.list;
          this.hasMore = result.hasMore;
          this.newsCount += result.list.length;
          this.isLoading = false;
        });
      this.subs.push(sub);
    }
  }

  goToSubnewsPage() {
    if (!this.isSubnewsPage) {
      var routeSlug = this.newsCategory!.slug;
      console.log(this.newsCategoryService.findPathByValue(routeSlug)?.path)
      const path=this.newsCategoryService.findPathByValue(routeSlug)?.path
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
