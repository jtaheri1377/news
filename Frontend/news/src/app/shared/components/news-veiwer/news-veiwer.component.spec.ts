import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsVeiwerComponent } from './news-veiwer.component';

describe('NewsVeiwerComponent', () => {
  let component: NewsVeiwerComponent;
  let fixture: ComponentFixture<NewsVeiwerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsVeiwerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsVeiwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
