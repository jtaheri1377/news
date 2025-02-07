import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingNavsComponent } from './meeting-navs.component';

describe('MeetingNavsComponent', () => {
  let component: MeetingNavsComponent;
  let fixture: ComponentFixture<MeetingNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingNavsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
