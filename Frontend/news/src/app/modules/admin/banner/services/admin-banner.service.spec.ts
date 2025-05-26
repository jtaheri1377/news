import { TestBed } from '@angular/core/testing';

import { AdminBannerService } from './admin-banner.service';

describe('AdminBannerService', () => {
  let service: AdminBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
