import { TestBed } from '@angular/core/testing';

import { AdminSiteFileService } from './admin-site-file.service';

describe('AdminSiteFileService', () => {
  let service: AdminSiteFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSiteFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
