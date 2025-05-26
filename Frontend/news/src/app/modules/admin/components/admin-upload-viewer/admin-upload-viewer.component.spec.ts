import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadViewerComponent } from './admin-upload-viewer.component';

describe('AdminUploadViewerComponent', () => {
  let component: AdminUploadViewerComponent;
  let fixture: ComponentFixture<AdminUploadViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUploadViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUploadViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
