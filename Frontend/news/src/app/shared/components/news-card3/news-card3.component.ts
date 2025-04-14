import { Component, inject, Input } from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import {
  NewsCategories,
  NewsCategory,
} from '../../../core/constants/news-categories';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsCategoryService } from '../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-news-card3',
  standalone: false,

  templateUrl: './news-card3.component.html',
  styleUrl: './news-card3.component.scss',
})
export class NewsCard3Component {
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
