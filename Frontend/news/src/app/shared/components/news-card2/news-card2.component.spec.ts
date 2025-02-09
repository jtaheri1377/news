import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCard2Component } from './news-card2.component';

describe('NewsCard2Component', () => {
  let component: NewsCard2Component;
  let fixture: ComponentFixture<NewsCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
