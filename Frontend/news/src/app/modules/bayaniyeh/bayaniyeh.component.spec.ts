import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayaniyehComponent } from './bayaniyeh.component';

describe('BayaniyehComponent', () => {
  let component: BayaniyehComponent;
  let fixture: ComponentFixture<BayaniyehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BayaniyehComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BayaniyehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
