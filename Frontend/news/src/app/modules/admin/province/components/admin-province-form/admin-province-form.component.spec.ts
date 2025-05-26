import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProvinceFormComponent } from './admin-province-form.component';

describe('AdminProvinceFormComponent', () => {
  let component: AdminProvinceFormComponent;
  let fixture: ComponentFixture<AdminProvinceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProvinceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProvinceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
