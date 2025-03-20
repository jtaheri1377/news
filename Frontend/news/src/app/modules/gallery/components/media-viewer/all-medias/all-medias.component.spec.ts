import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMediasComponent } from './all-medias.component';

describe('AllMediasComponent', () => {
  let component: AllMediasComponent;
  let fixture: ComponentFixture<AllMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllMediasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
