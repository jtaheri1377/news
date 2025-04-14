import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavsComponent } from './admin-navs.component';

describe('AdminNavsComponent', () => {
  let component: AdminNavsComponent;
  let fixture: ComponentFixture<AdminNavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNavsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
