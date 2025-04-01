import { Component, OnInit } from '@angular/core';
import { StoryService } from './components/stories/services/story.service';
import { NewsCategories } from '../../core/constants/news-categories';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  showStory: boolean = false;
  newsCategories=NewsCategories;
  constructor(private story: StoryService) {}

  bannerItems = [
    {
      id: 0,
      img: './test/bannerHome1.jpg',
      title: 'دیدار نماینده مجلس خبرگان با رئیس مجمع نمایندگان طلاب شیراز',
      studyTime: '4',
      date: 'دو روز پیش',
    },
    {
      id: 1,
      img: './test/bannerHome2.jpg',
      title:
        'از قول مساعد برای اجرای طرح های عملیاتی مجمع نمایندگان تا تلاش برای برپایی میز خدمت در مدارس علمی',
      studyTime: '5',
      date: 'در این هفته',
    },
    {
      id: 2,
      img: './test/bannerHome3.jpg',
      title: 'مجمع نمایندگان طلاب باید در تراز حوزه انقلابی باشد',
      studyTime: '7',
      date: 'در این هفته',
    },
    {
      id: 3,
      img: './test/bannerHome4.jpg',
      title: 'مجمع نمایندگان طلاب و فضلای حوزه علمیه قم',
      studyTime: '3',
      date: 'دیروز',
    },
  ];
  ngOnInit(): void {
    this.story.showStory.subscribe((res: boolean) => {
      this.showStory = res;
    });
  }
  // private destroy$: Subject<void> = new Subject<void>();

  //   async getProgressValue$(storyId: number): Observable<number> {
  //     const story = this.storyGroup.find(x => x.id === storyId);
  //     if (story?.isSeen) return of(100);

  //     this.currentStoryId = story!.id;
  //     return this.counter().pipe(takeUntil(this.destroy$));
  //   }

  //   counter(): Observable<number> {
  //     const subject = new Subject<number>();
  //     let counter = 0;

  //     const intervalId = window.setInterval(() => {
  //       counter += 1;
  //       this.storyTimer = counter;
  //       subject.next(this.storyTimer);
  //     }, 1000);
  //     Increment every 1 second

  //     پاکسازی حافظه
  //     subject.pipe(takeUntil(this.destroy$)).subscribe({
  //       complete: () => clearInterval(intervalId)
  //     });

  //     return subject.asObservable();
  //   }

  //   ngOnDestroy() {
  //     this.destroy$.next();
  //     this.destroy$.complete();
  //   }
}

//  async getProgressValue$(storyId: number): Observable<number> {
//   const story = this.storyGroup.filter((x) => x.id == storyId);
//   if (story[0].isSeen) return of(100);
//   else {
//     const notSeen = this.storyGroup.filter((x) => x.id == storyId);
//     this.currentStoryId = notSeen[0]?.id;
//     this.counter().subscribe((res) => {
//       return of(res);
//     });
//   }
//   return of(3);
// }

// counter(): Observable<number> {
//   let counter = 0;
//   const intervalId = window.setInterval(() => {
//     counter += 1;
//     this.storyTimer = counter;
//     return of(this.storyTimer);
//   }, 100); // Increment every 1 second
// }

// ngOnDestroy(): void {
//   clearInterval(this.intervalId); // پاک کردن interval هنگام نابودی کامپوننت
// }
