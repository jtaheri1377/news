import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowSliderComponent } from './shadow-slider.component';

describe('ShadowSliderComponent', () => {
  let component: ShadowSliderComponent;
  let fixture: ComponentFixture<ShadowSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShadowSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadowSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
