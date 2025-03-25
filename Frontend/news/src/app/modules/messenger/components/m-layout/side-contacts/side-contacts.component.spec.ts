import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideContactsComponent } from './side-contacts.component';

describe('SideContactsComponent', () => {
  let component: SideContactsComponent;
  let fixture: ComponentFixture<SideContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
