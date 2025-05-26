import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiseListComponent } from './wise-list.component';

describe('WiseListComponent', () => {
  let component: WiseListComponent;
  let fixture: ComponentFixture<WiseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WiseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
