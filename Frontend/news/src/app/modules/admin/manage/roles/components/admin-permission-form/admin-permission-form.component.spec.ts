import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionFormComponent } from './admin-permission-form.component';

describe('AdminPermissionFormComponent', () => {
  let component: AdminPermissionFormComponent;
  let fixture: ComponentFixture<AdminPermissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPermissionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
