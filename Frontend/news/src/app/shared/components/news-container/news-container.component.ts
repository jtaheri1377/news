import {
  ChangeDetectionStrategy,
  Component,
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
  NewsCategoryKey,
  NewsCategories,
} from '../../../core/constants/news-categories';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';

@Component({
  selector: 'app-news-container',
  standalone: false,
  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss',
})
// changeDetection:ChangeDetectionStrategy.OnPush,
export class NewsContainerComponent implements OnInit, OnDestroy {
  @Input() newsCategory: (typeof NewsCategories)[NewsCategoryKey] | null = null;

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  newsCount: number = 0;
  items: any[] = [];
  @Input('isSubnewsPage') isSubnewsPage: boolean = false;

  constructor(
    private service: MeetingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.newsCategory == null) {
      this.route.params
        .pipe(
          map((route: Params) => {
            var category = Object.values(NewsCategories).find(
              (x) => x.slug == route['slug']
              
            );
            this.newsCategory =
              category as (typeof NewsCategories)[NewsCategoryKey];
            this.fetchNews();
          })
        )
        .subscribe(() => {});
    } else this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory) {
      var sub = this.service
        .getNews(this.newsCategory.id, this.newsCount, 10)
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          // debugger;
          // this.items.push(...result.news);
          this.items = [...this.items, ...result.list];
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
      this.router.navigate([routeSlug], { relativeTo: this.route });
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
