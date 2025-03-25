import { TestBed } from '@angular/core/testing';

import { MDrawerPusherService } from './m-drawer-pusher.service';

describe('MDrawerPusherService', () => {
  let service: MDrawerPusherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MDrawerPusherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
