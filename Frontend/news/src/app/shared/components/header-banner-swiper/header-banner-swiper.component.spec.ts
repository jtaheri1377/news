import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBannerSwiperComponent } from './header-banner-swiper.component';

describe('HeaderBannerSwiperComponent', () => {
  let component: HeaderBannerSwiperComponent;
  let fixture: ComponentFixture<HeaderBannerSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderBannerSwiperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBannerSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
