import { Component, inject, Input } from '@angular/core';
import { NewsItem } from '../../../../core/models/News/newsItem.model';
import { Router } from '@angular/router';
import { NewsCategory } from '../../../../core/constants/news-categories';
import { NewsCategoryService } from '../../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-big-news-card',
  standalone: false,
  
  templateUrl: './big-news-card.component.html',
  styleUrl: './big-news-card.component.scss'
})
export class BigNewsCardComponent {
 isBookmarked: boolean = false;

  @Input() noBackground!: boolean;
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
