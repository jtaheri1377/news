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
import { AuthService } from '../../../auth/services/auth.service';
import { NotifService } from '../../../../shared/services/notif.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { title } from 'process';

@Component({
  selector: 'app-wise-container',
  standalone: false,

  templateUrl: './wise-container.component.html',
  styleUrl: './wise-container.component.scss',
})
export class WiseContainerComponent implements OnInit, OnDestroy {
  // @Input() newsCategory: (typeof NewsCategories)[NewsCategoryKey] | null = null;
  @Input() isSelectMode: boolean = false;
  @Input() noFooter: boolean = false;
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
    private auth: AuthService,
    private readonly dialog: MatDialog,
    private notif: NotifService,
    private adminWise: AdminWiseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var sub = this.service.WiseListUpdate$.subscribe(() => {
      this.isFirstLoading = true;
      this.newsCount = 0;
      this.fetchNews();
    });
    this.subs.push(sub);
    this.fetchNews();
  }

  onSelectItem(item: Wise) {
    if (this.isSelectMode && this.auth.hasPermission('WISE_SAVE')) {
      this.adminWise.editingWise$.next(item);
      this.router.navigate(['.', 'save'], { relativeTo: this.route });
    } else {
      if (this.auth.hasPermission('WISE_GET'))
        this.router.navigate(['.', item.id], { relativeTo: this.route });
    }
  }

  delete(item: Wise) {
    this.openDeleteDialog(item.id!);
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'آیا از حذف کتاب مورد نظر اطمینان دارید؟',
        title: 'حذف فرزانگان',
      },
      disableClose: false,
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined && result) {
        var sub = this.service.delete(id!).subscribe(() => {
          this.service.WiseListUpdate$.next(true);
          this.notif.success('کتاب  مورد نظر با موفقیت حذف شد!');
        });
        this.subs.push(sub);
      }
    });
  }

  fetchNews() {
    this.isLoading = true;
    var sub = this.service
      .getWises(this.newsCount, this.isFirstLoading ? 10 : 5)
      .subscribe((result: LazyLoadResponse<Wise>) => {
        //
        // this.items.push(...result.news);
        this.hasMore = result.hasMore;
        if (this.isFirstLoading) {
          this.isFirstLoading = false;
          this.items = result.list;
          this.newsCount = result.list.length;
        } else {
          this.items = [...this.items, ...result.list];
          this.newsCount += result.list.length;
        }
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
