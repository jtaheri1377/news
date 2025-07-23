import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NewsCategories } from '../../../../core/constants/news-categories';
import { map, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MeetingService } from '../../../meeting/services/meeting.service';
import { NewsCategoryService } from '../../../../core/constants/services/news-category.service';
import { LazyLoadResponse } from '../../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsItem } from '../../../../core/models/News/newsItem.model';
import { NewsCategory } from '../../../../core/constants/news-categories';

@Component({
  selector: 'app-all-units',
  standalone: false,

  templateUrl: './all-units.component.html',
  styleUrl: './all-units.component.scss',
})
export class AllUnitsComponent implements OnInit, OnDestroy {
  @Input() newsCategory: NewsCategory | null = null;
  @Input() noHeading: boolean = false;
  @Input() noTitle: boolean = false;
  @Input() noMoreButton: boolean = false;
  @Input() showBigListCard: boolean = false;
  @Input() showAll: boolean = true;
  @Input('isSubnewsPage') isSubnewsPage: boolean = false;
  @Input() customStyles: string = '';
  @Input() itemsCount: number = 0;
  @Input() take: number = 0;
  @Input() enteredItems: any[] = [];

  newsCategories = NewsCategories;
  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  newsCount: number = 0;
  items: any[] = [];

  constructor(
    private service: MeetingService,
    private router: Router,
    private route: ActivatedRoute,
    private newsCategoryService: NewsCategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.newsCategory =
      this.newsCategories['commissions'].children!['commissionSeeyasi'];
    if (this.newsCategory == null) {
      this.route.params
        .pipe(
          map((route: Params) => {
            var category = Object.values(NewsCategories).find(
              (x) => x.slug == route['slug']
            );
            this.newsCategory = category as NewsCategory;
            this.fetchNews();
            this.cdr.detectChanges();
          })
        )
        .subscribe(() => {});
    } else this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    this.cdr.detectChanges();
    if (this.newsCategory) {
      var sub = this.service
        .getNews(
          this.newsCategory.code,
          0,
          this.itemsCount == 0 ? 10 : this.itemsCount
        )
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          // this.items.push(...result.news);
          this.items = result.list;
          this.hasMore = result.hasMore;
          this.newsCount = result.list.length;
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      this.subs.push(sub);
    }
  }

  onSelectCategory(value: NewsCategory | null) {
    this.newsCategory = value;
    this.itemsCount = 0;
    this.items = [];
    this.fetchNews();
    this.cdr.detectChanges();
  }

  goToSubnewsPage() {
    if (!this.isSubnewsPage) {
      var routeSlug = this.newsCategory!.slug;
      const path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
      this.router.navigate([path]);
      this.cdr.detectChanges();
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

  seeMore() {
    if (!this.isSubnewsPage) {
      var routeSlug = this.newsCategory!.slug;
      const path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
      this.router.navigate([path]);
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
