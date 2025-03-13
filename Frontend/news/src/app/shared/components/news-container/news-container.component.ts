import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NewsItem } from '../../../core/models/News/newsItem.model';
import { NewsHeading } from '../../../core/models/News/newsHeading.model';
import { MeetingService } from '../../../modules/meeting/services/meeting.service';
import { NewsResponse } from '../../../core/models/News/news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-container',
  standalone: false,

  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss',
})
export class NewsContainerComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  @Input('newsHeading') heading!: NewsHeading;
  @Input('items') items!: NewsItem[];
  @Input('hasMore') hasMore: boolean = false;
  @Input('isLoading') isLoading: boolean = false;
  @Input('category') category: string = '';
  @Input('newsCount') newsCount: number = 0;

  constructor(private service: MeetingService) {}

  ngOnInit(): void {
    console.log(this.newsCount);
  }

  getMore() {
    this.isLoading = true;
    var sub = this.service
      .getNews(this.heading.ctgId, this.newsCount, 1)
      .subscribe((result: NewsResponse) => {
        this.isLoading = false
        this.items.push(...result.news);
        this.hasMore = result.hasMore;
        this.newsCount += 1;
      });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe);
  }
}
