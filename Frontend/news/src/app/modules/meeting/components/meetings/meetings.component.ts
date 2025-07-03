import {
  NewsCategories,
  NewsCategory,
} from '../../../../core/constants/news-categories';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { NewsItem } from '../../../../core/models/News/newsItem.model';
import { NewsCategoryService } from '../../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-meetings',
  standalone: false,

  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.scss',
})
export class MeetingsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  //  newsCategories : Record<keyof typeof NewsCategories, NewsCategory> = NewsCategories!;
   newsCategories = NewsCategories;

  // newsCategories = NewsCategories as Record<
  //   keyof typeof NewsCategories,
  //   NewsCategory
  // >;
  isLoading: boolean = false;


  constructor(
    private service: MeetingService,
    private ncService: NewsCategoryService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.subs.forEach((x) => x.unsubscribe);
  }
}
