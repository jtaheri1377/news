import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MFooterComponent } from './m-footer.component';

describe('MFooterComponent', () => {
  let component: MFooterComponent;
  let fixture: ComponentFixture<MFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
