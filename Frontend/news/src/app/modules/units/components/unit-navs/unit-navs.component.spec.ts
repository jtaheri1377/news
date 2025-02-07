import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitNavsComponent } from './unit-navs.component';

describe('UnitNavsComponent', () => {
  let component: UnitNavsComponent;
  let fixture: ComponentFixture<UnitNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitNavsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
