import { Component, inject, Input } from '@angular/core';
import { Banner } from '../../../../../../core/models/banner/banner.model';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifService } from '../../../../../../shared/services/notif.service';
import { AdminBannerService } from '../../../services/admin-banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-item',
  standalone: false,

  templateUrl: './banner-item.component.html',
  styleUrl: './banner-item.component.scss',
})
export class BannerItemComponent {
  @Input('item') item!: Banner;
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;
  subs: Subscription[] = [];
  isLoading: boolean = false;

  router = inject(Router);
  constructor(
    private service: AdminBannerService,
    private dialog: MatDialog,
    private notif: NotifService
  ) {}

  goToSubnewsPage(newsId: number) {
    // var routeSlug = this.newsCategory!.slug;
    // var path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
    // this.router.navigate([path, newsId]);
  }

  delete(id: number) {
    var dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف بنر',
        message: 'آیا از حذف بنر مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer)
        this.service.delete(id).subscribe((res: any) => {
          this.service.updatedBanner$.next(null);
          this.notif.success('بنر مورد نظر حذف شد');
        });
    });
  }
}
