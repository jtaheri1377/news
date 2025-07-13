import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleFormComponent } from './admin-role-form.component';

describe('AdminRoleFormComponent', () => {
  let component: AdminRoleFormComponent;
  let fixture: ComponentFixture<AdminRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRoleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
