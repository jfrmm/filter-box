import { TestBed } from '@angular/core/testing';
import { FilterMediatorService } from './filter-mediator.service';

describe('FilterMediatorService', () => {
  let filterMediatorService: FilterMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterMediatorService] });
    filterMediatorService = TestBed.get(FilterMediatorService);
  });

  it('should be created', () => {
    filterMediatorService = TestBed.get(FilterMediatorService);
    expect(filterMediatorService).toBeDefined();
  });
});
