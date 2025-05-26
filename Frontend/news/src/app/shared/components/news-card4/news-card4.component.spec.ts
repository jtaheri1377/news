import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCard4Component } from './news-card4.component';

describe('NewsCard4Component', () => {
  let component: NewsCard4Component;
  let fixture: ComponentFixture<NewsCard4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsCard4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCard4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
