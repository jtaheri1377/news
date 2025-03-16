import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { LazyLoadResponse } from '../../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { Wise } from '../../../../core/models/wise/wise.model';
import { WiseService } from '../../services/wise.service';

@Component({
  selector: 'app-wise-container',
  standalone: false,

  templateUrl: './wise-container.component.html',
  styleUrl: './wise-container.component.scss',
})
export class WiseContainerComponent implements OnInit, OnDestroy {
  // @Input() newsCategory: (typeof NewsCategories)[NewsCategoryKey] | null = null;

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  newsCount: number = 0;
  items: any[] = [];
  @Input('isSubnewsPage') isSubnewsPage: boolean = false;

  constructor(private service: WiseService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.isLoading = true;
    var sub = this.service
      .getWises(this.newsCount, 5)
      .subscribe((result: LazyLoadResponse<Wise>) => {
        // debugger;
        // this.items.push(...result.news);
        this.items = [...this.items, ...result.list];
        this.hasMore = result.hasMore;
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
