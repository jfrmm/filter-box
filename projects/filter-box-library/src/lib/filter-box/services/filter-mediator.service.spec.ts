<<<<<<< HEAD:projects/filter-box-library/src/lib/filter-box/filter-mediator.service.spec.ts
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { asyncScheduler, of } from 'rxjs';
import { FilterClearEvent } from './events/filter-clear-event';
import { FilterMediatorService } from './filter-mediator.service';
import { AutocompleteFilter } from './filters/autocomplete-filter/autocomplete-filter';
import { Filter } from './filters/filter/filter';
=======
import { async, TestBed } from '@angular/core/testing';

import { FilterClearEvent } from '../events/filter-clear-event';
import { AutocompleteFilter } from '../filters/autocomplete-filter';
import { FilterModel } from '../models/filter.model';
import { FilterMediatorService } from './filter-mediator.service';
>>>>>>> develop:projects/filter-box-library/src/lib/filter-box/services/filter-mediator.service.spec.ts

describe('FilterMediatorService', () => {
  let filterMediatorService: FilterMediatorService;
  let mockFilter: AutocompleteFilter;
  const mockFunction = () => of(null, asyncScheduler);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterMediatorService] });
    filterMediatorService = TestBed.get(FilterMediatorService);

    mockFilter = new AutocompleteFilter('MOCK', 'MOCK', mockFunction, { id: 1, value: 'MOCK' });

    filterMediatorService.setFilters([mockFilter]);
  });

  it('should be created', () => {
    expect(filterMediatorService).toBeDefined();
  });

  it('should not emit user events', async(() => {
    spyOn(filterMediatorService.filterChanged, 'emit');

    mockFilter.disableFilter();
    mockFilter.clearFilter();
    mockFilter.enableFilter();
    mockFilter.setValue('mock');

    expect(filterMediatorService.filterChanged.emit).toHaveBeenCalledTimes(0);
  }));

  it('should emit user events', async(() => {
    spyOn(filterMediatorService.filterChanged, 'emit');

    mockFilter.formControl.setValue({});
    mockFilter.formControl.setValue('');
    mockFilter.clearFilter();

    expect(filterMediatorService.filterChanged.emit).toHaveBeenCalledTimes(2);
  }));

  it('should not execute behaviours', async(() => {
    const spy = spyOn<any>(filterMediatorService, 'findAndExecuteBehaviours');
    spy.calls.reset();

    mockFilter.clearFilter();
    mockFilter.disableFilter();
    mockFilter.enableFilter();
    mockFilter.setValue('asdasd');

    expect(spy.calls.count()).toBe(0, 'Should be 0');
  }));

  it('should execute behaviours', async(() => {
    filterMediatorService.setFilters(
      [mockFilter],
      [
        {
<<<<<<< HEAD:projects/filter-box-library/src/lib/filter-box/filter-mediator.service.spec.ts
          emitters: [mockFilter as Filter],
=======
          emitters: [mockFilter as FilterModel],
>>>>>>> develop:projects/filter-box-library/src/lib/filter-box/services/filter-mediator.service.spec.ts
          events: [new FilterClearEvent()],
          callbacks: [
            /*() => mockFilter.setValue('Mock')*/
          ],
        },
      ]
    );

    const spy = spyOn<any>(filterMediatorService, 'findAndExecuteBehaviours');
    spy.calls.reset();
    expect(spy.calls.count()).toBe(0, 'Should be 0');

    mockFilter.formControl.setValue('');
    expect(spy.calls.count()).toBe(1, 'Should be 1');

    mockFilter.formControl.setValue({});
    expect(spy.calls.count()).toBe(2, 'Should be 2');
  }));
});
