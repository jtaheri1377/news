import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallNewsCardComponent } from './small-news-card.component';

describe('SmallNewsCardComponent', () => {
  let component: SmallNewsCardComponent;
  let fixture: ComponentFixture<SmallNewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallNewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
