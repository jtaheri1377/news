import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUnitsComponent } from './all-units.component';

describe('AllUnitsComponent', () => {
  let component: AllUnitsComponent;
  let fixture: ComponentFixture<AllUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
