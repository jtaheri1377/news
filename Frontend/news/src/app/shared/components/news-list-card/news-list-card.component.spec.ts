import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListCardComponent } from './news-list-card.component';

describe('NewsListCardComponent', () => {
  let component: NewsListCardComponent;
  let fixture: ComponentFixture<NewsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
