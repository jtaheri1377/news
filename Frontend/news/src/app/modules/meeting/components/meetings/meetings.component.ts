import {
  NewsCategories,
  NewsCategory,
} from '../../../../core/constants/news-categories';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { NewsItem } from '../../../../core/models/News/newsItem.model';
import { NewsCategoryService } from '../../../../core/constants/services/news-category.service';
import { DrawerPusherService } from '../../../../layout/services/drawer-pusher.service';

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
  @ViewChild('public') MyProp!: ElementRef;

  constructor(
    private service: MeetingService,
    private drawerService: DrawerPusherService,
    private ncService: NewsCategoryService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      var sub = this.drawerService.provinceUpdate$.subscribe(
        (scrollMode: boolean) => {
          if (scrollMode) this.scrollTo('jalasatOstani');
        }
      );
      this.subs.push(sub);
    }, 800);
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.drawerService.provinceUpdate$.next(false);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
