import { TestBed } from '@angular/core/testing';

import { AdminNewsService } from './admin-news.service';

describe('AdminNewsService', () => {
  let service: AdminNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
