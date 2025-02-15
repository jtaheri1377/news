import { Component, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header-banner-swiper',
  standalone: false,

  templateUrl: './header-banner-swiper.component.html',
  styleUrl: './header-banner-swiper.component.scss',
})
export class HeaderBannerSwiperComponent {

   isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }



 @Input('items') items = [
    {
      id: 0,
      img: '',
      title: '',
      studyTime: ' ',
      date: '',
    }
    
  ];

  ngOnInit() {
    //  this.slidesPerview = 3;
    // this.breakpoints = {
    //   640: {
    //     slidesPerView: 2,
    //   },
    //   768: {
    //     slidesPerView: 3,
    //   },
    //   1024: {
    //     slidesPerView: 4,
    //   },
    // };
  }
}
