import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { map, Subscription } from 'rxjs';
import { LazyLoadResponse } from '../../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { Wise } from '../../../../core/models/wise/wise.model';
import { WiseService } from '../../services/wise.service';
import { AdminWiseService } from '../../../admin/wise/services/admin-wise.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wise-container',
  standalone: false,

  templateUrl: './wise-container.component.html',
  styleUrl: './wise-container.component.scss',
})
export class WiseContainerComponent implements OnInit, OnDestroy {
  // @Input() newsCategory: (typeof NewsCategories)[NewsCategoryKey] | null = null;
  @Input() isSelectMode: boolean = false;
  @Output() selectItem = new EventEmitter<Wise>();

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  isFirstLoading: boolean = true;
  newsCount: number = 0;
  items: any[] = [];

  constructor(
    private service: WiseService,
    private adminWise: AdminWiseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  onSelectItem(item: Wise) {
    if (this.isSelectMode) {
      this.adminWise.editingWise$.next(item);
      this.router.navigate(['.', 'save'], { relativeTo: this.route });
    } else {
      this.router.navigate(['.', item.id], { relativeTo: this.route });
    }
  }

  fetchNews() {
    this.isLoading = true;
    var sub = this.service
      .getWises(this.newsCount, this.isFirstLoading ? 10 : 5)
      .subscribe((result: LazyLoadResponse<Wise>) => {
        //
        // this.items.push(...result.news);
        this.items = [...this.items, ...result.list];
        this.hasMore = result.hasMore;
        this.isFirstLoading = false;
        this.newsCount += result.list.length;
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  // goToSubnewsPage() {
  //   if (!this.isSubnewsPage) {
  //     var routeSlug = this.newsCategory!.slug;
  //     this.router.navigate([routeSlug], { relativeTo: this.route });
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
