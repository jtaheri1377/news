import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IranMapComponent } from './iran-map.component';

describe('IranMapComponent', () => {
  let component: IranMapComponent;
  let fixture: ComponentFixture<IranMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IranMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IranMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
