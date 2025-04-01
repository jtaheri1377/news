import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCard3Component } from './news-card3.component';

describe('NewsCard3Component', () => {
  let component: NewsCard3Component;
  let fixture: ComponentFixture<NewsCard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCard3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
