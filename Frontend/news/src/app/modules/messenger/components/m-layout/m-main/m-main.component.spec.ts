import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MMainComponent } from './m-main.component';

describe('MMainComponent', () => {
  let component: MMainComponent;
  let fixture: ComponentFixture<MMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
