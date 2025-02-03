import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of, Subject, takeUntil } from 'rxjs';
import { setInterval } from 'timers/promises';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story-viewer',
  standalone: false,

  templateUrl: './story-viewer.component.html',
  styleUrl: './story-viewer.component.scss',
})
export class StoryViewerComponent implements OnInit, OnDestroy {
  storyTimer = 0;
  counterval = 0;

  currentStoryId: number = 0;
  storyGroup = [
    { id: 0, isSeen: true },
    { id: 1, isSeen: false },
    { id: 2, isSeen: false },
  ];
  intervalId: any; // برای ذخیره ID interval

  constructor(private story: StoryService) {}

  ngOnInit(): void {}

  private destroy$: Subject<void> = new Subject<void>();

  getProgressValue$(storyId: number): Observable<number> {
    const story = this.storyGroup.find((x) => x.id === storyId);
    if (story?.isSeen) return of(100);
    this.currentStoryId = story!.id;
    // debugger;
    return this.counter().pipe(takeUntil(this.destroy$));
  }

  hideStory() {
    this.story.showStory.next(false);
  }

  counter(): Observable<number> {
    const subject = new Subject<number>();

    const intervalId = window.setInterval(() => {
      this.counterval += 1;
      this.storyTimer = this.counterval;
      subject.next(this.storyTimer);
    }, 100); // Increment every 1 second

    // پاکسازی حافظه
    subject.pipe(takeUntil(this.destroy$)).subscribe({
      complete: () => {
        // const currentStory = this.storyGroup.find((x) => x.id === this.currentStoryId);
        //     let f={
        //       id:...currentStory?.id,
        //       isSeen: ...currentStory?.isSeen
        //     }
        // clearInterval(intervalId)
      },
    });

    return subject.asObservable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
