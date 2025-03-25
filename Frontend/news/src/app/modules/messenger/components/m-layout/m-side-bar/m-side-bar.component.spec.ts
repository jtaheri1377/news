import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSideBarComponent } from './m-side-bar.component';

describe('MSideBarComponent', () => {
  let component: MSideBarComponent;
  let fixture: ComponentFixture<MSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
