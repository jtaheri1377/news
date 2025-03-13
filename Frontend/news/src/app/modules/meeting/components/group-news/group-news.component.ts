import { Component, Input } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { NewsResponse } from '../../../../core/models/News/news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-news',
  standalone: false,

  templateUrl: './group-news.component.html',
  styleUrl: './group-news.component.scss',
})
export class GroupNewsComponent {
  subs: Subscription[] = [];
  newsResponse!: NewsResponse;
  @Input('newsCount') newsCount: number = 0;
 

  constructor(private service: MeetingService) {}

  ngOnInit(): void {
    var sub = this.service
      .getNews(2, this.newsCount, 1)
      .subscribe((result: NewsResponse) => {
        this.newsResponse =result;
  this.newsCount += 1;

      });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe);
  }
}
