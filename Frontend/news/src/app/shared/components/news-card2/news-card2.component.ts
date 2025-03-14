import { Component, Input } from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';

@Component({
  selector: 'app-news-card2',
  standalone: false,
  
  templateUrl: './news-card2.component.html',
  styleUrl: './news-card2.component.scss'
})
export class NewsCard2Component {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;
  @Input('item') item!: NewsItem;
}
