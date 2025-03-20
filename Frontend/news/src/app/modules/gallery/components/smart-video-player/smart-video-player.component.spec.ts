import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartVideoPlayerComponent } from './smart-video-player.component';

describe('SmartVideoPlayerComponent', () => {
  let component: SmartVideoPlayerComponent;
  let fixture: ComponentFixture<SmartVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmartVideoPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
