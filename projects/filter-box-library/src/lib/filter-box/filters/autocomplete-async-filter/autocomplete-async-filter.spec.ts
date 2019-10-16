import { AutocompleteAsyncFilter } from '../autocomplete-async-filter/autocomplete-async-filter';

describe('AutocompleteAsyncFilter', () => {
  let autocompleteAsyncFilter: AutocompleteAsyncFilter;

  beforeEach(() => {
    autocompleteAsyncFilter = new AutocompleteAsyncFilter('test', 'test1', () => null);
  });

  it('should create an instance', () => {
    expect(autocompleteAsyncFilter).toBeDefined();
  });

  it(`should return correct type`, () => {
    expect(autocompleteAsyncFilter.type).toBe('autocomplete-async');
  });
});
