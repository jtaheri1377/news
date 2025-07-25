import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFormComponent } from './news-form.component';

describe('NewsFormComponent', () => {
  let component: NewsFormComponent;
  let fixture: ComponentFixture<NewsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
