import { TestBed } from '@angular/core/testing';

import { AdminStoryService } from './admin-story.service';

describe('AdminStoryService', () => {
  let service: AdminStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
