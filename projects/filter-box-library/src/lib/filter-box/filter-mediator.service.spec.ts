import { TestBed } from '@angular/core/testing';

import { FilterMediatorService } from './filter-mediator.service';

describe('FilterMediatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterMediatorService = TestBed.get(FilterMediatorService);
    expect(service).toBeTruthy();
  });
});
