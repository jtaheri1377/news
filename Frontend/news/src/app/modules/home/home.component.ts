import { Component, OnInit } from '@angular/core';
import { StoryService } from './components/stories/services/story.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  showStory: boolean = false;
  constructor(private story: StoryService) {}

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
