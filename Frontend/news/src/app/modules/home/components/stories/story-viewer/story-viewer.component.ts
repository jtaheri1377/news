import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of, Subject, takeUntil } from 'rxjs';
import { setInterval } from 'timers/promises';
import { StoryService } from '../services/story.service';
import { Media } from '../../../../../core/models/media/media.model';
import { UploadService } from '../../../../messenger/file-browser/services/upload.service';
import { Story } from '../../../../../core/models/story/story.model';

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
  item: Story | null = null;
  //  [
  // {
  //   name: '',
  //   title: ' دیدار هیئت رئیسه امروز با مدیر حوزه های علمیه حضرت آیت الله',
  //   img: './test/story1.jpg',
  // },
  // {
  //   name: '',
  //   title: 'سفر رئیس مجمع نمایندگان به تهران',
  //   img: './test/story2.jpg',
  // },
  // {
  //   name: '',
  //   title: 'جلسه نمایندگان طلاب قم',
  //   img: './test/story4.jpg',
  // },
  // {
  //   name: '',
  //   title: 'بازدید هیئت رئیسه از نمایشگاه کتاب حوزه',
  //   img: './test/story3.jpg',
  // },
  // {
  //   name: '',
  //   title: 'دیدار با رئیس جمهور محترم',
  //   img: './test/story7.jpg',
  // },

  // {
  //   name: '',
  //   title: 'رونمایی از تألیفات جدید نمایندگان طلاب',
  //   img: './test/story5.jpg',
  // },
  // {
  //   name: '',
  //   title: 'رونمایی از تألیفات جدید نمایندگان طلاب',
  //   img: './test/story6.jpg',
  // },
  // ];

  constructor(
    private story: StoryService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.story.showStory.subscribe((res: Story | null) => {
      this.item = res;
    });
  }

  isImage(fileType: string) {
    return this.uploadService.isImage(fileType);
  }

  isVideo(fileType: string) {
    return this.uploadService.isVideo(fileType);
  }

  private destroy$: Subject<void> = new Subject<void>();

  getProgressValue$(storyId: number): Observable<number> {
    const story = this.storyGroup.find((x) => x.id === storyId);
    if (story?.isSeen) return of(100);
    this.currentStoryId = story!.id;
    // debugger;
    return this.counter().pipe(takeUntil(this.destroy$));
  }

  hideStory() {
    this.story.showStory.next(null);
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
