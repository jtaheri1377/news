import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IranDailyNewsComponent } from './iran-daily-news.component';

describe('IranDailyNewsComponent', () => {
  let component: IranDailyNewsComponent;
  let fixture: ComponentFixture<IranDailyNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IranDailyNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IranDailyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
