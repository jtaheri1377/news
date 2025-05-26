import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProvinceComponent } from './admin-province.component';

describe('AdminProvinceComponent', () => {
  let component: AdminProvinceComponent;
  let fixture: ComponentFixture<AdminProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProvinceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
