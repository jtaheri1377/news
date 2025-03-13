import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCard2Component } from './skeleton-card2.component';

describe('SkeletonCard2Component', () => {
  let component: SkeletonCard2Component;
  let fixture: ComponentFixture<SkeletonCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonCard2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
