import { TestBed } from '@angular/core/testing';

import { DrawerPusherService } from './drawer-pusher.service';

describe('DrawerPusherService', () => {
  let service: DrawerPusherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerPusherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
