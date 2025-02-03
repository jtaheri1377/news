import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavPannelComponent } from './mobile-nav-pannel.component';

describe('MobileNavPannelComponent', () => {
  let component: MobileNavPannelComponent;
  let fixture: ComponentFixture<MobileNavPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileNavPannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
