import { Component, inject, Input } from '@angular/core';
import { NewsItem } from '../../../../../../core/models/News/newsItem.model';
import { NewsCategory } from '../../../../../../core/constants/news-categories';
import { NewsCategoryService } from '../../../../../../core/constants/services/news-category.service';
import { Router } from '@angular/router';
import { NewsService } from '../../../../../../shared/services/news.service';
import { AdminNewsService } from '../../../services/admin-news.service';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotifService } from '../../../../../../shared/services/notif.service';

@Component({
  selector: 'app-admin-news-list-item',
  standalone: false,

  templateUrl: './admin-news-list-item.component.html',
  styleUrl: './admin-news-list-item.component.scss',
})
export class AdminNewsListItemComponent {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;
  subs: Subscription[] = [];
  isLoading: boolean = false;
  @Input('item') item!: NewsItem;
  @Input() newsCategory: NewsCategory | null = null;

  router = inject(Router);
  constructor(
    private newsCategoryService: NewsCategoryService,
    private service: AdminNewsService,
    private dialog: MatDialog,
    private notif: NotifService
  ) {}

  goToSubnewsPage(newsId: number) {
    var routeSlug = this.newsCategory!.slug;
    var path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
    this.router.navigate([path, newsId]);
  }

  delete(id: number) {
    var dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف خبر',
        message: 'آیا از حذف خبر مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer)
        this.service.delete(id).subscribe((res: any) => {
          this.notif.success('خبر مورد نظر حذف شد');
          this.service.DeletedNews$.next(null);
        });
    });
  }
}
