import { TestBed } from '@angular/core/testing';

import { WiseService } from './wise.service';

describe('WiseService', () => {
  let service: WiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
