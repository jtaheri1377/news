import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MContactItemComponent } from './m-contact-item.component';

describe('MContactItemComponent', () => {
  let component: MContactItemComponent;
  let fixture: ComponentFixture<MContactItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MContactItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MContactItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
