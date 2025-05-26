import { TestBed } from '@angular/core/testing';

import { AdminWiseService } from './admin-wise.service';

describe('AdminWiseService', () => {
  let service: AdminWiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
