import { AutocompleteFilter } from './autocomplete-filter';
import { of } from 'rxjs';

describe('AutocompleteFilter', () => {
  let autoCompleteFilter: AutocompleteFilter;

  beforeEach(() => {
    autoCompleteFilter = new AutocompleteFilter('MOCK', 'MOCK', [{ id: 1, value: 'MOCK' }]);
  });

  it('should create an instance', () => {
    expect(autoCompleteFilter).toBeDefined();
  });

  it('should set the filter value', () => {
    autoCompleteFilter.setValue('MOCK');

    expect(autoCompleteFilter.filterElement.formControl.value).toBe('MOCK');
  });

  it('should clear the filter value', () => {
    autoCompleteFilter.clearFilter();

    expect(autoCompleteFilter.filterElement.formControl.value).toBe('');
  });

  it('should disable & enable the filter', () => {
    autoCompleteFilter.disableFilter();

    expect(autoCompleteFilter.filterElement.formControl.disabled).toBeTruthy();

    autoCompleteFilter.enableFilter();

    expect(autoCompleteFilter.filterElement.formControl.enabled).toBeTruthy();
  });

  it('should have reactive options', () => {
    function updateOptions() {
      return of([{ id: 2, value: 'MOCK2' }]);
    }
    autoCompleteFilter.getFilterOptions = updateOptions;
    autoCompleteFilter.updateFilterOptions(null);


    expect(autoCompleteFilter.options).toEqual([{ id: 2, value: 'MOCK2' }]);
  });

  // it('should update the filter options', () => {});
});
