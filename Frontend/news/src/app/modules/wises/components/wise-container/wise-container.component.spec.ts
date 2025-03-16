import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiseContainerComponent } from './wise-container.component';

describe('WiseContainerComponent', () => {
  let component: WiseContainerComponent;
  let fixture: ComponentFixture<WiseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiseContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
