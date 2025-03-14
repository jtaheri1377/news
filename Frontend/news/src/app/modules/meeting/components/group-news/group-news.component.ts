import { Component, Input } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { NewsResponse } from '../../../../core/models/News/news.model';
import { Subscription, map, switchMap } from 'rxjs';
import { NewsCategories } from '../../../../core/news-categories';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private service: MeetingService,private route:ActivatedRoute) {}

  ngOnInit(): void {

    var sub = this.route.params.pipe(switchMap((res:any)=>{
      let categoryName=res.category;
      let categoryId=NewsCategories;
      return this.service
      .getNews(2, this.newsCount, 1)
    }))
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
