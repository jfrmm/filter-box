import { TestBed } from '@angular/core/testing';

import { FilterHelperService } from './filter-helper.service';

describe('FilterHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterHelperService = TestBed.get(FilterHelperService);
    expect(service).toBeTruthy();
  });
});
