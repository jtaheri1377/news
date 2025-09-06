import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
} from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { of, Subject, takeUntil } from 'rxjs';
import { setInterval } from 'timers/promises';
import { StoryService } from '../services/story.service';
import { Media } from '../../../../../core/models/media/media.model';
import { UploadService } from '../../../../messenger/file-browser/services/upload.service';
import { Story } from '../../../../../core/models/story/story.model';
import { SwiperOptions } from 'swiper/types';

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
  config: SwiperOptions = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: true,
    watchSlidesProgress: true,
  };
  currentSlideIndex: number = 0;
  activeSlideIndex: number = 0;

  //...
  @ViewChildren('storyVideo') storyVideos!: QueryList<ElementRef>;
  @ViewChild('swiperRef') swiperRef: ElementRef | undefined;
  //...

  onSlideChange(swiper: any) {
    this.activeSlideIndex = swiper.realIndex;

    // ویدیوهای غیرفعال رو متوقف کن و از ابتدا پخش کن
    this.storyVideos.forEach((video, index) => {
      if (index !== this.activeSlideIndex) {
        video.nativeElement.pause();
        video.nativeElement.currentTime = 0;
      }
    });
  }

  onVideoEnd(event: any) {
    if (this.swiperRef) {
      const swiper = this.swiperRef.nativeElement.swiper;
      if (swiper) {
        // بررسی می‌کنیم که آیا این اسلاید، آخرین اسلاید هست یا نه
        if (swiper.isEnd) {
          // اگر آخرین اسلاید بود، یک پیام نمایش بده
          this.hideStory();
          // this.hideStory();
        } else {
          // در غیر این صورت، به اسلاید بعدی برو
          swiper.slideNext();
        }
      }
    }
  }









   @ViewChild('storyVideo') storyVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('timeline') timeline!: ElementRef<HTMLDivElement>;

  progress: number = 0;

  onTimeUpdate() {
    if (this.storyVideo && this.storyVideo.nativeElement) {
      const video = this.storyVideo.nativeElement;
      const progress = (video.currentTime / video.duration) * 100;
      this.progress = progress;
    }
  }

  seek(event: MouseEvent) {
    if (this.storyVideo && this.storyVideo.nativeElement && this.timeline && this.timeline.nativeElement) {
      const timelineElement = this.timeline.nativeElement;
      const video = this.storyVideo.nativeElement;

      const timelineWidth = timelineElement.offsetWidth;
      const clickX = event.offsetX;
      const newTime = (clickX / timelineWidth) * video.duration;

      video.currentTime = newTime;
    }
  }





  // onSlideChange(event: any): void {
  //   const swiper = event?.target?.swiper;
  //   if (swiper) {
  //     this.currentSlideIndex = swiper.activeIndex;
  //     alert(`شما در اسلاید شماره ${this.currentSlideIndex + 1} هستید`);
  //   } else {
  //     console.warn('Swiper instance not found');
  //   }
  // }

  // onSlideChange(event: any) {
  // this.playActiveVideo(event.target.swiper);
  // }

  // ngAfterViewInit() {
  //   // وقتی اسلایدر لود شد، اسلاید اول رو پخش کن
  //   setTimeout(() => {
  //     const swiper = document.querySelector('swiper-container')?.swiper;
  //     this.playActiveVideo(swiper);
  //   }, 500);
  // }

  // private playActiveVideo(swiper: any) {
  //   if (!swiper) return;

  //   // همه ویدیوها رو متوقف کن
  //   swiper.slides.forEach((slide: HTMLElement) => {
  //     const video = slide.querySelector('video') as HTMLVideoElement;
  //     if (video) {
  //       video.pause();
  //       video.currentTime = 0;
  //     }
  //   });

  //   // ویدیوی فعال رو پلی کن
  //   const activeSlide = swiper.slides[swiper.activeIndex];
  //   const activeVideo = activeSlide.querySelector('video') as HTMLVideoElement;

  //   if (activeVideo) {
  //     activeVideo.muted = true; // خیلی مهم
  //     activeVideo.playsInline = true; // خیلی مهم
  //     activeVideo.play().catch((err) => {
  //       console.warn('Autoplay block شد:', err);
  //     });
  //   }
  // }

  // onSwiperChange(event: any) {
  //   this.currentSlideIndex = event.detail[0].activeIndex;
  //   alert(this.currentSlideIndex);
  // }
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
    //
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
