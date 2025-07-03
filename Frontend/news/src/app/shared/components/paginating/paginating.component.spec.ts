import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatingComponent } from './paginating.component';

describe('PaginatingComponent', () => {
  let component: PaginatingComponent;
  let fixture: ComponentFixture<PaginatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
