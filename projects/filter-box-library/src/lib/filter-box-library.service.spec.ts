import { TestBed } from '@angular/core/testing';

import { FilterBoxLibraryService } from './filter-box-library.service';

describe('FilterBoxLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterBoxLibraryService = TestBed.get(FilterBoxLibraryService);
    expect(service).toBeTruthy();
  });
});
