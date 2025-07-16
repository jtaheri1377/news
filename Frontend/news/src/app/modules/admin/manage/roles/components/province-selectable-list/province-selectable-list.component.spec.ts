import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceSelectableListComponent } from './province-selectable-list.component';

describe('ProvinceSelectableListComponent', () => {
  let component: ProvinceSelectableListComponent;
  let fixture: ComponentFixture<ProvinceSelectableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProvinceSelectableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinceSelectableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
