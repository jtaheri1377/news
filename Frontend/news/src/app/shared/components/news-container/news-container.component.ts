import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import { NewsHeading } from '../../../core/models/News/newsHeading.model';
import { MeetingService } from '../../../modules/meeting/services/meeting.service';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  NewsCategories,
  NewsCategory,
} from '../../../core/constants/news-categories';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsCategoryService } from '../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-news-container',
  standalone: false,
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
// changeDetection:ChangeDetectionStrategy.OnPush,
export class NewsContainerComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() newsCategory: NewsCategory | null = null;
  @Input() noHeading: boolean = false;
  @Input() noTitle: boolean = false;
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

  cdr = inject(ChangeDetectorRef);
  constructor(
    private service: MeetingService,
    private router: Router,
    private route: ActivatedRoute,
    private newsCategoryService:NewsCategoryService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(
        'afterview itemscount: ',
        this.itemsCount,
        'take: ',
        this.take
      );
    }, 100);
  }

  ngOnInit(): void {
    console.log('itemscount: ', this.itemsCount, 'take: ');
    if (this.newsCategory == null) {
      this.route.params
        .pipe(
          map((route: Params) => {
            var category = Object.values(NewsCategories).find(
              (x) => x.slug == route['slug']
            );
            this.newsCategory =
              category as NewsCategory;
            this.fetchNews();
            this.cdr.markForCheck();
          })
        )
        .subscribe(() => {});
    } else this.fetchNews();
    // this.cdr.markForCheck();
  }

  fetchNews() {
    this.isLoading = true;
    this.cdr.markForCheck();
    if (this.newsCategory) {
      var sub = this.service
        .getNews(
          this.newsCategory.id,
          this.newsCount,
          this.itemsCount == 0 ? 10 : this.itemsCount
        )
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          // debugger;
          // this.items.push(...result.news);
          this.items = [...this.items, ...result.list];
          this.hasMore = result.hasMore;
          this.newsCount += result.list.length;
          this.isLoading = false;
          this.cdr.markForCheck();
        });
      this.subs.push(sub);
      this.cdr.markForCheck();
    }
  }

  goToSubnewsPage() {
    if (!this.isSubnewsPage) {
      var routeSlug = this.newsCategory!.slug;
      const path=this.newsCategoryService.findPathByValue(routeSlug)?.path
      this.router.navigate([path]);
      this.cdr.markForCheck();
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
