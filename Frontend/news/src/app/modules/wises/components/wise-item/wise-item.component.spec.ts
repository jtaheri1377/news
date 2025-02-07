import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiseItemComponent } from './wise-item.component';

describe('WiseItemComponent', () => {
  let component: WiseItemComponent;
  let fixture: ComponentFixture<WiseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiseItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
