import { asyncScheduler, of } from 'rxjs';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterEmptyEvent } from '../../events/filter-empty-event';
import { AutocompleteMultipleFilter } from './autocomplete-multiple-filter';

describe('AutocompleteMultiple', () => {
  let autocompleteMultipleFilter: AutocompleteMultipleFilter;
  const mockFunction = () => of(null, asyncScheduler);
  const mockData = [{ id: 1, value: 'test' }, { id: 2, value: 'test' }];

  beforeEach(() => {
    autocompleteMultipleFilter = new AutocompleteMultipleFilter('test', 'test', mockFunction, mockData);
  });

  it('should create an instance', () => {
    expect(autocompleteMultipleFilter).toBeTruthy();
  });

  it(`should select initial value in the selection`, () => {
    expect(autocompleteMultipleFilter.selection.selected).toEqual(mockData);
  });

  it(`sould return the correct type`, () => {
    expect(autocompleteMultipleFilter.type).toBe('autocomplete-multiple');
  });

  it(`should map the value correctly`, () => {
    expect(autocompleteMultipleFilter.param.value).toEqual(mockData.map(value => value.id.toString()).join(','));

    autocompleteMultipleFilter.formControl.setValue(null);
    expect(autocompleteMultipleFilter.param.value).toBeNull();
  });

  it(`should clear the filter`, () => {
    autocompleteMultipleFilter.formControl.setValue(mockData);

    let event = autocompleteMultipleFilter.clearFilter();
    expect(event instanceof FilterClearEvent).toBeTruthy();
    expect(autocompleteMultipleFilter.selection.selected.length).toBe(0);

    autocompleteMultipleFilter.formControl.setValue(mockData);
    event = autocompleteMultipleFilter.clearFilter(true);
    expect(event instanceof FilterEmptyEvent).toBeTruthy();
    expect(autocompleteMultipleFilter.selection.selected.length).toBe(0);
  });
});
