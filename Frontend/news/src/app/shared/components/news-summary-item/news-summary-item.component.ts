import { Component } from '@angular/core';

@Component({
  selector: 'app-news-summary-item',
  standalone: false,

  templateUrl: './news-summary-item.component.html',
  styleUrl: './news-summary-item.component.scss',
})
export class NewsSummaryItemComponent {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;

}
