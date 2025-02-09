import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCard1Component } from './news-card1.component';

describe('NewsCard1Component', () => {
  let component: NewsCard1Component;
  let fixture: ComponentFixture<NewsCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCard1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
