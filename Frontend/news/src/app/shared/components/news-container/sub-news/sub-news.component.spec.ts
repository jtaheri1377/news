import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNewsComponent } from './sub-news.component';

describe('SubNewsComponent', () => {
  let component: SubNewsComponent;
  let fixture: ComponentFixture<SubNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
