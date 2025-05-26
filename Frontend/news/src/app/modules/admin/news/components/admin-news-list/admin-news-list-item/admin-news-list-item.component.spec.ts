import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsListItemComponent } from './admin-news-list-item.component';

describe('AdminNewsListItemComponent', () => {
  let component: AdminNewsListItemComponent;
  let fixture: ComponentFixture<AdminNewsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminNewsListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
