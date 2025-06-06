import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoftogooComponent } from './goftogoo.component';

describe('GoftogooComponent', () => {
  let component: GoftogooComponent;
  let fixture: ComponentFixture<GoftogooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoftogooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoftogooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
