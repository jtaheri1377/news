import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotghComponent } from './notgh.component';

describe('NotghComponent', () => {
  let component: NotghComponent;
  let fixture: ComponentFixture<NotghComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotghComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
