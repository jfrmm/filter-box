import { AutocompleteAsyncFilter } from './autocomplete-async-filter';

describe('AutocompleteAsyncFilter', () => {
  let autocompleteAsyncFilter: AutocompleteAsyncFilter;

  beforeEach(() => {
    autocompleteAsyncFilter = new AutocompleteAsyncFilter('test', 'test1', () => null);
  });

  it('should create an instance', () => {
    expect(autocompleteAsyncFilter).toBeDefined();
  });

  it('should set the filter value', () => {
    autocompleteAsyncFilter.setValue('MOCK');

    expect(autocompleteAsyncFilter.filterElement.formControl.value).toBe('MOCK');
  });

  it('should clear the filter value', () => {
    autocompleteAsyncFilter.clearFilter();

    expect(autocompleteAsyncFilter.filterElement.formControl.value).toBe('');
  });

  it('should disable & enable the filter', () => {
    autocompleteAsyncFilter.disableFilter();

    expect(autocompleteAsyncFilter.filterElement.formControl.disabled).toBeTruthy();

    autocompleteAsyncFilter.enableFilter();

    expect(autocompleteAsyncFilter.filterElement.formControl.enabled).toBeTruthy();
  });
});
