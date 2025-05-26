import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigNewsCardComponent } from './big-news-card.component';

describe('BigNewsCardComponent', () => {
  let component: BigNewsCardComponent;
  let fixture: ComponentFixture<BigNewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BigNewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
