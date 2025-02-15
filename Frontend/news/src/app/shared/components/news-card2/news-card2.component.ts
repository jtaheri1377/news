import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card2',
  standalone: false,
  
  templateUrl: './news-card2.component.html',
  styleUrl: './news-card2.component.scss'
})
export class NewsCard2Component {
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
