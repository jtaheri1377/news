import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWrapperComponent } from './message-wrapper.component';

describe('MessageWrapperComponent', () => {
  let component: MessageWrapperComponent;
  let fixture: ComponentFixture<MessageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
