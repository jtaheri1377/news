import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNewsComponent } from './group-news.component';

describe('GroupNewsComponent', () => {
  let component: GroupNewsComponent;
  let fixture: ComponentFixture<GroupNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
