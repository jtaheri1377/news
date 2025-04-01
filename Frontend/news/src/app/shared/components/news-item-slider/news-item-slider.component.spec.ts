import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemSliderComponent } from './news-item-slider.component';

describe('NewsItemSliderComponent', () => {
  let component: NewsItemSliderComponent;
  let fixture: ComponentFixture<NewsItemSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsItemSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsItemSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
