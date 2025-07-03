import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartLoaderComponent } from './part-loader.component';

describe('PartLoaderComponent', () => {
  let component: PartLoaderComponent;
  let fixture: ComponentFixture<PartLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
