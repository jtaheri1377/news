import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSubHeadersComponent } from './nav-sub-headers.component';

describe('NavSubHeadersComponent', () => {
  let component: NavSubHeadersComponent;
  let fixture: ComponentFixture<NavSubHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavSubHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSubHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
