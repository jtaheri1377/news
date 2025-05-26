import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourNewsContainerComponent } from './four-news-container.component';

describe('FourNewsContainerComponent', () => {
  let component: FourNewsContainerComponent;
  let fixture: ComponentFixture<FourNewsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourNewsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourNewsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
