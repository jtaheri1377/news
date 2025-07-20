import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkhbarDigarComponent } from './akhbar-digar.component';

describe('AkhbarDigarComponent', () => {
  let component: AkhbarDigarComponent;
  let fixture: ComponentFixture<AkhbarDigarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AkhbarDigarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkhbarDigarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
