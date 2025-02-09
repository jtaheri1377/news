import { Component } from '@angular/core';

@Component({
  selector: 'app-news-card2',
  standalone: false,
  
  templateUrl: './news-card2.component.html',
  styleUrl: './news-card2.component.scss'
})
export class NewsCard2Component {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;
}
