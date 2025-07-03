import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerItemComponent } from './banner-item.component';

describe('BannerItemComponent', () => {
  let component: BannerItemComponent;
  let fixture: ComponentFixture<BannerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
