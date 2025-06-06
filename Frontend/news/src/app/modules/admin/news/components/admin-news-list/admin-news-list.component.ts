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
import { Province } from '../../../../../core/models/province/province.model';
import { AdminService } from '../../../services/admin.service';
import { ParentChild } from '../../../../models/ParentChild.model';
import { NewsCategoryService } from '../../../../../core/constants/services/news-category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-news-list',
  standalone: false,

  templateUrl: './admin-news-list.component.html',
  styleUrl: './admin-news-list.component.scss',
})
export class AdminNewsListComponent implements OnInit,  OnDestroy {
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
  newsCategoriesSelect: Province[] = [];
  newsChildCategories: Province[] = [];
  selectedItemId: number | null = null;
  isCategoryChanged: boolean = false;
  newsCategories = NewsCategories;
  newsCount: number = 0;
  items: any[] = [];

  myForm = new FormGroup({
    parentCategoryIds: new FormControl<number[]>([], Validators.required),
    categoryIds: new FormControl<number[]>([], Validators.required),
  });

  constructor(
    private service: NewsService,
    private newsCategoryService: NewsCategoryService,
    private adminNews: AdminNewsService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newsCategory = (this.newsCategories as any)['interviews'].children![
      'mosahebeHeyatRaeeseh'
    ];
    this.initForm$();
    this.fetchNews();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['newsCategory'] && !changes['newsCategory'].firstChange) {
  //     if (this.newsCategory) {
  //       alert('دسته تغییرکرد')
  //       this.isCategoryChanged = true;
  //       this.fetchNews();
  //     }
  //   }
  // }

  initForm$() {
    this.isLoading = true;
    var sub = this.adminService
      .getNewsCategories()
      .subscribe((newsCategories) => {
        this.newsCategoriesSelect = newsCategories;
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  onSelectCategory(id: number) {
    var sub = this.adminService
      .getSubNewsCategories(id)
      .subscribe((result: Province[]) => {
        this.newsChildCategories = result;
        this.isLoading = false;
      });
    this.subs.push(sub);

    // this.newsCategory = this.newsCategoryService.findCategoryByValue(id);
    // this.isCategoryChanged = true;

    this.fetchNews();
  }
  onSelectChildCategory(id: number) {
    this.isCategoryChanged = true;
    this.newsCategory = this.newsCategoryService.findCategoryByValue(id);
    this.fetchNews();
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
    debugger;
    if (this.newsCategory) {
      var sub = this.service
        .getNews(
          this.newsCategory.id,
          this.isCategoryChanged ? 0 : this.newsCount,
          this.itemsCount == 0 ? 10 : this.itemsCount
        )
        .subscribe((result: LazyLoadResponse<NewsItem>) => {
          if (this.isCategoryChanged) {
            this.items = result.list;
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
