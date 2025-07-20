import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProvinceTreeComponent } from './admin-province-tree.component';

describe('AdminProvinceTreeComponent', () => {
  let component: AdminProvinceTreeComponent;
  let fixture: ComponentFixture<AdminProvinceTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProvinceTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProvinceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
