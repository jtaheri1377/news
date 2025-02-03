import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSummaryItemComponent } from './news-summary-item.component';

describe('NewsSummaryItemComponent', () => {
  let component: NewsSummaryItemComponent;
  let fixture: ComponentFixture<NewsSummaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsSummaryItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
