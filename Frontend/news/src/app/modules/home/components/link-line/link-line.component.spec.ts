import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkLineComponent } from './link-line.component';

describe('LinkLineComponent', () => {
  let component: LinkLineComponent;
  let fixture: ComponentFixture<LinkLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
