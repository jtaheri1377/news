import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCard1Component } from './skeleton-card1.component';

describe('SkeletonCard1Component', () => {
  let component: SkeletonCard1Component;
  let fixture: ComponentFixture<SkeletonCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkeletonCard1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
