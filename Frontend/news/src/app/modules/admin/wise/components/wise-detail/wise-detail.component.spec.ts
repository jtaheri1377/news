import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiseDetailComponent } from './wise-detail.component';

describe('WiseDetailComponent', () => {
  let component: WiseDetailComponent;
  let fixture: ComponentFixture<WiseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
