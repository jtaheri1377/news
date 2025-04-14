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
  bannerItems = [
    {
      id: 0,
      img: './test/namayande2.jpg',
      title: 'دیدار نماینده مجلس خبرگان با رئیس مجمع نمایندگان طلاب شیراز',
      studyTime: '4',
      date: 'دو روز پیش',
    },
    {
      id: 1,
      img: './test/namayande5.jpg',
      title: 'همایش جهاد تبیین و انتخابات کرمان',
      studyTime: '5',
      date: 'در این هفته',
    },
    {
      id: 2,
      img: './test/namayande3.jpg',
      title: 'مراسم تجلیل از بزرگان علمی شیراز',
      studyTime: '7',
      date: 'در این هفته',
    },
    {
      id: 3,
      img: './test/namayande4.jpg',
      title: 'مراسم عمامه گذاری نیمه شعبان طلاب اصفهان',
      studyTime: '3',
      date: 'دیروز',
    },
  ];

  constructor(
    private service: MeetingService,
    private ncService: NewsCategoryService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.subs.forEach((x) => x.unsubscribe);
  }
}
