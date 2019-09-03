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

    expect(autocompleteAsyncFilter.elements.formControl.value).toBe('MOCK');
  });

  it('should clear the filter value', () => {
    autocompleteAsyncFilter.clearFilter();

    expect(autocompleteAsyncFilter.elements.formControl.value).toBe('');
  });

  it('should disable & enable the filter', () => {
    autocompleteAsyncFilter.disableFilter();

    expect(autocompleteAsyncFilter.elements.formControl.disabled).toBeTruthy();

    autocompleteAsyncFilter.enableFilter();

    expect(autocompleteAsyncFilter.elements.formControl.enabled).toBeTruthy();
  });
});
