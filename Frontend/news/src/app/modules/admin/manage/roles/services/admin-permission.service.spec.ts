import { TestBed } from '@angular/core/testing';

import { AdminPermissionService } from './admin-permission.service';

describe('AdminPermissionService', () => {
  let service: AdminPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
