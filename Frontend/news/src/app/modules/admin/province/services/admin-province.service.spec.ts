import { TestBed } from '@angular/core/testing';

import { AdminProvinceService } from './admin-province.service';

describe('AdminProvinceService', () => {
  let service: AdminProvinceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProvinceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
