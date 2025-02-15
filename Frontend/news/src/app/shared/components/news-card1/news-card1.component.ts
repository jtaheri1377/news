import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card1',
  standalone: false,
  
  templateUrl: './news-card1.component.html',
  styleUrl: './news-card1.component.scss'
})
export class NewsCard1Component {
  showSummaryPragraph: boolean = false;
  isBookmarked: boolean = false;
  @Input('item') item={
    id: 0,
    img: '',
    title: ' ',
    studyTime: '',
    province: '',
    reviews: '',
    subject: '',
  }
}
