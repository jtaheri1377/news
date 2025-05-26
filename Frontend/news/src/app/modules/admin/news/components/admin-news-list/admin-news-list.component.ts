import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NewsCategory } from '../../../../../core/constants/news-categories';
import { Subscription } from 'rxjs';
import { NewsItem } from '../../../../../core/models/News/newsItem.model';
import { LazyLoadResponse } from '../../../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsService } from '../../../../../shared/services/news.service';
import { NewsCategories } from '../../../../../core/constants/news-categories';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNewsService } from '../../services/admin-news.service';

@Component({
  selector: 'app-admin-news-list',
  standalone: false,

  templateUrl: './admin-news-list.component.html',
  styleUrl: './admin-news-list.component.scss',
})
export class AdminNewsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() newsCategory: NewsCategory | null = null;

  @Input() noHeading: boolean = false;
  @Input() noTitle: boolean = false;
  @Input() noMoreButton: boolean = false;
  @Input() selectItemMode: boolean = false;

  @Input('isSubnewsPage') isSubnewsPage: boolean = false;
  @Input() customStyles: string = '';
  @Input() itemsCount: number = 0;
  @Input() take: number = 0;
  @Output() selectNewsItem = new EventEmitter<number>();

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  selectedItemId: number | null = null;
  isCategoryChanged: boolean = false;
  newsCategories = NewsCategories;
  newsCount: number = 0;
  items: any[] = [];

  constructor(
    private service: NewsService,
    private adminNews: AdminNewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newsCategory'] && !changes['newsCategory'].firstChange) {
      debugger;
      if (this.newsCategory) {
        this.isCategoryChanged = true;
        this.fetchNews();
      }
    }
  }

  ngOnInit(): void {
    //  if (this.newsCategory == null) {
    //   this.route.params
    //     .pipe(
    //       map((route: Params) => {
    //         var category = Object.values(NewsCategories).find(
    //           (x) => x.slug == route['slug']
    //         );
    //         this.newsCategory =
    //           category as NewsCategory;
    //         this.fetchNews();
    //       })
    //     )
    //     .subscribe(() => {});
    // } else
    this.newsCategory = (this.newsCategories as any)['interviews'].children![
      'mosahebeHeyatRaeeseh'
    ];
    this.fetchNews();
    // this.cdr.markForCheck();
  }

  selectItem(id: number) {
    if (this.selectItemMode) {
      this.selectNewsItem.next(id);
      this.selectedItemId = id;
      return;
    } else {
      this.adminNews.editingNews$.next(id);
      this.router.navigate(['.', 'save'], { relativeTo: this.route });
    }
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory) {
      var sub = this.service
        .getNews(
          this.newsCategory.id,
          this.isCategoryChanged ? 0 : this.newsCount,
          this.itemsCount == 0 ? 10 : this.itemsCount
        )
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          if (this.isCategoryChanged) {
            this.items = [...result.list];
            this.newsCount = result.list.length;
            this.isCategoryChanged = false;
          } else {
            this.items = [...this.items, ...result.list];
            this.newsCount += result.list.length;
          }
          this.hasMore = result.hasMore;
          this.isLoading = false;
        });
      this.subs.push(sub);
    }
  }

  // goToSubnewsPage() {
  //   if (!this.isSubnewsPage) {
  //     var routeSlug = this.newsCategory!.slug;
  //     const path=this.newsCategoryService.findPathByValue(routeSlug)?.path
  //     this.router.navigate([path]);
  //   }
  // }

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
