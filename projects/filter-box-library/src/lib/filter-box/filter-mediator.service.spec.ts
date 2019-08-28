import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { FilterMediatorService } from './filter-mediator.service';
import { AutocompleteFilter } from './filters/autocomplete-filter';
import { FilterModel } from './models/filter.model';
import { FilterClearEvent } from './events/filter-clear-event';

describe('FilterMediatorService', () => {
  let filterMediatorService: FilterMediatorService;
  let mockFilter: AutocompleteFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterMediatorService] });
    filterMediatorService = TestBed.get(FilterMediatorService);

    mockFilter = new AutocompleteFilter('MOCK', 'MOCK', [{ id: 1, value: 'MOCK' }], { id: 1, value: 'MOCK' });

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

    mockFilter.elements[0].formControl.setValue({});
    mockFilter.elements[0].formControl.setValue('');
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
    filterMediatorService.setFilters([mockFilter], [{
      emitters: [mockFilter as FilterModel], events: [new FilterClearEvent()], callbacks: [/*() => mockFilter.setValue('Mock')*/]
    }]);

    const spy = spyOn<any>(filterMediatorService, 'findAndExecuteBehaviours');
    spy.calls.reset();
    expect(spy.calls.count()).toBe(0, 'Should be 0');

    mockFilter.elements[0].formControl.setValue('');
    expect(spy.calls.count()).toBe(1, 'Should be 1');

    mockFilter.elements[0].formControl.setValue({});
    expect(spy.calls.count()).toBe(2, 'Should be 2');
  }));
});
