import { Component, inject, Input } from '@angular/core';
import { NewsItem } from '../../../../../../core/models/News/newsItem.model';
import { NewsCategory } from '../../../../../../core/constants/news-categories';
import { NewsCategoryService } from '../../../../../../core/constants/services/news-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-news-list-item',
  standalone: false,

  templateUrl: './admin-news-list-item.component.html',
  styleUrl: './admin-news-list-item.component.scss',
})
export class AdminNewsListItemComponent {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;
  @Input('item') item!: NewsItem;
  @Input() newsCategory: NewsCategory | null = null;

  router = inject(Router);
  constructor(private newsCategoryService: NewsCategoryService) {}

  goToSubnewsPage(newsId: number) {
    var routeSlug = this.newsCategory!.slug;
    var path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
    this.router.navigate([path, newsId]);
  }
}
