import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFileFormComponent } from './site-file-form.component';

describe('SiteFileFormComponent', () => {
  let component: SiteFileFormComponent;
  let fixture: ComponentFixture<SiteFileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteFileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
