import { TestBed } from '@angular/core/testing';

import { AdminRoleService } from './admin-role.service';

describe('AdminRoleService', () => {
  let service: AdminRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
