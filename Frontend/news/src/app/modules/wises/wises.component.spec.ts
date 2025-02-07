import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WisesComponent } from './wises.component';

describe('WisesComponent', () => {
  let component: WisesComponent;
  let fixture: ComponentFixture<WisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
