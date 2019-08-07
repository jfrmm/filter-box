import { AutocompleteFilter } from './autocomplete-filter';

describe('AutocompleteFilter', () => {
  let autoCompleteFilter: AutocompleteFilter;

  beforeEach(() => {
    autoCompleteFilter = new AutocompleteFilter('test', 'test1', []);
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

  // it('should update the filter options', () => {});
});
