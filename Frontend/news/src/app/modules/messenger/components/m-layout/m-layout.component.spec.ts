import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLayoutComponent } from './m-layout.component';

describe('MLayoutComponent', () => {
  let component: MLayoutComponent;
  let fixture: ComponentFixture<MLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
