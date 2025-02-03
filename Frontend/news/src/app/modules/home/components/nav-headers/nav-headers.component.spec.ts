import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeadersComponent } from './nav-headers.component';

describe('NavHeadersComponent', () => {
  let component: NavHeadersComponent;
  let fixture: ComponentFixture<NavHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
