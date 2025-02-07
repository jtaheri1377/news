import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsNavsComponent } from './interviews-navs.component';

describe('InterviewsNavsComponent', () => {
  let component: InterviewsNavsComponent;
  let fixture: ComponentFixture<InterviewsNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewsNavsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewsNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
