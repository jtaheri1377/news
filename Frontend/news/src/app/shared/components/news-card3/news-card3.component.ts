import { Component, Input } from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';

@Component({
  selector: 'app-news-card3',
  standalone: false,
  
  templateUrl: './news-card3.component.html',
  styleUrl: './news-card3.component.scss'
})
export class NewsCard3Component {
 isBookmarked: boolean = false;
  @Input('item') item!: NewsItem;
}
