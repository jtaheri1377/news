import { TestBed } from '@angular/core/testing';

import { NewsCategoryService } from './news-category.service';

describe('NewsCategoryService', () => {
  let service: NewsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
