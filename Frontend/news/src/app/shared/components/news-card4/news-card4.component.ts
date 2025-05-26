import { Component, inject, Input } from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import { NewsCategory } from '../../../core/constants/news-categories';
import { Router } from '@angular/router';
import { NewsCategoryService } from '../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-news-card4',
  standalone: false,

  templateUrl: './news-card4.component.html',
  styleUrl: './news-card4.component.scss'
})
export class NewsCard4Component {

  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;

  @Input('item') item!: NewsItem;
  @Input() newsCategory: NewsCategory | null = null;

  router = inject(Router);
  constructor(private newsCategoryService: NewsCategoryService) {
  }


  goToSubnewsPage(newsId: number) {
    var routeSlug = this.newsCategory!.slug;
    var path = this.newsCategoryService.findPathByValue(routeSlug)?.path;
    console.log([path, newsId]);
    this.router.navigate([path, newsId]);
  }
}
