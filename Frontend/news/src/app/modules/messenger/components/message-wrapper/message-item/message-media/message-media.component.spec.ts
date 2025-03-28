import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMediaComponent } from './message-media.component';

describe('MessageMediaComponent', () => {
  let component: MessageMediaComponent;
  let fixture: ComponentFixture<MessageMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
