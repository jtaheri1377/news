import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiseFormComponent } from './wise-form.component';

describe('WiseFormComponent', () => {
  let component: WiseFormComponent;
  let fixture: ComponentFixture<WiseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
