import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvincesSliderComponent } from './provinces-slider.component';

describe('ProvincesSliderComponent', () => {
  let component: ProvincesSliderComponent;
  let fixture: ComponentFixture<ProvincesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvincesSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvincesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
