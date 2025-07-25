import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NewsItem } from '../../../../core/models/News/newsItem.model';
import {
  NewsCategory,
  NewsCategories,
} from '../../../../core/constants/news-categories';
import { map, Subscription } from 'rxjs';
import { MeetingService } from '../../../meeting/services/meeting.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsCategoryService } from '../../../../core/constants/services/news-category.service';
import { LazyLoadResponse } from '../../../../core/models/lazyLoadResponse/LazyLoadResponse.model';

@Component({
  selector: 'app-links',
  standalone: false,

  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent implements OnInit, OnDestroy {
  // [x: string]: any;
  @Input() items: NewsItem[] = [];
  @Input() noHeading: boolean = false;
  @Input() newsCategory: NewsCategory | null = null;

  @Input() noTitle: boolean = false;
  @Input() thinTitle: boolean = false;
  @Input() noMoreButton: boolean = false;
  @Input() showBigListCard: boolean = false;
  @Input() showAll: boolean = true;
  @Input('isSubnewsPage') isSubnewsPage: boolean = false;
  @Input() customStyles: string = '';
  @Input() itemsCount: number = 0;
  @Input() take: number = 0;
  @Input() enteredItems: any[] = [];
  @Input('bigItems') horizontal_Result: boolean = true;
  @Input() scrollToTopOnLoad: boolean = false;

  subs: Subscription[] = [];
  NewsCategories = NewsCategories;
  hasMore: boolean = false;
  isLoading: boolean = false;
  newsCount: number = 0;
  // items: any[] = [];
  @ViewChild('top') top!: ElementRef;

  constructor(
    private service: MeetingService,
    private router: Router,
    private route: ActivatedRoute,
    private newsCategoryService: NewsCategoryService
  ) {}

  // ngAfterViewInit(): void {
  //   if (this.scrollToTopOnLoad)
  //     setTimeout(() => {
  //       this.scrollToTop();
  //     }, 100);
  // }

  // scrollToTop() {
  //   this.top.nativeElement.scrollIntoView({ behavior: 'smooth' });
  // }
  ngOnInit(): void {
    if (this.enteredItems.length > 0) return;
    if (this.newsCategory == null) {
      this.route.params
        .pipe(
          map((route: Params) => {
            var category = Object.values(NewsCategories).find(
              (x) => x.slug == route['slug']
            );
            this.newsCategory = category as NewsCategory;
            this.fetchNews();
            this.scrollToTopOnLoad = true;
          })
        )
        .subscribe(() => {});
    } else this.fetchNews();
    // this.cdr.markForCheck();
  }

  fetchNews() {
    this.isLoading = true;
    if (this.newsCategory && this.items.length==0) {
      var sub = this.service
        .getNews(
          this.newsCategory.code,
          this.newsCount,
          this.itemsCount == 0 ? 10 : this.itemsCount
        )
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          //
          // this.items.push(...result.news);
          if (this.noMoreButton) this.items = [...result.list];
          else this.items = [...this.items, ...result.list];
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
