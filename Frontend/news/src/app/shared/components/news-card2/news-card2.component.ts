import { Component, inject, Input } from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsCategory } from '../../../core/constants/news-categories';
import { NewsCategoryService } from '../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-news-card2',
  standalone: false,

  templateUrl: './news-card2.component.html',
  styleUrl: './news-card2.component.scss',
})
export class NewsCard2Component {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;

  @Input('item') item!: NewsItem;
  @Input() newsCategory: NewsCategory | null = null;

  router = inject(Router);
  constructor(private newsCategoryService: NewsCategoryService) {}

  goToSubnewsPage(newsId: number) {
    var routeSlug = this.newsCategory!.slug;
    var path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
    console.log([path, newsId]);
    this.router.navigate([path, newsId]);
  }
}
