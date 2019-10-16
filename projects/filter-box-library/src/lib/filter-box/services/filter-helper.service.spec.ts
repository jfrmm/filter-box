import { TestBed } from '@angular/core/testing';

import { FilterHelperService } from './filter-helper.service';

describe('FilterHelperService', () => {
  let service: FilterHelperService;
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(FilterHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should display option`, () => {
    expect(service.displayFilter(null)).toBeUndefined();

    expect(service.displayFilter({id: 1, value: 'test'})).toBe('test');
  });
});
