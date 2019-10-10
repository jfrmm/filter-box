import { of } from 'rxjs';
import { AutocompleteFilter } from './autocomplete-filter';

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

    expect(autoCompleteFilter.elements.formControl.value).toBe('MOCK');
  });

  it('should clear the filter value', () => {
    autoCompleteFilter.clearFilter();

    expect(autoCompleteFilter.elements.formControl.value).toBe('');
  });

  it('should disable & enable the filter', () => {
    autoCompleteFilter.disableFilter();

    expect(autoCompleteFilter.elements.formControl.disabled).toBeTruthy();

    autoCompleteFilter.enableFilter();

    expect(autoCompleteFilter.elements.formControl.enabled).toBeTruthy();
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
