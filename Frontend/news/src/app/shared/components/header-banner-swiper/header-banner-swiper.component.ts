import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-header-banner-swiper',
  standalone: false,

  templateUrl: './header-banner-swiper.component.html',
  styleUrl: './header-banner-swiper.component.scss',
})
export class HeaderBannerSwiperComponent {
  slidesPerview = 1;
  navigation = true;
  breakpoints: any;
  config: SwiperOptions = {
    slidesPerView: 3,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  };

  ngOnInit() {
    //  this.slidesPerview = 3;
    this.breakpoints = {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    };
  }
}
