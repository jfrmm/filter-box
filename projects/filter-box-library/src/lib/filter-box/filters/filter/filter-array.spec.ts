import { of } from 'rxjs';
import { AutocompleteFilter } from '../autocomplete-filter/autocomplete-filter';
import { FilterArray } from './filter-array';

describe('FilterArray', () => {
  let filters: FilterArray;

  beforeEach(() => {
    filters = new FilterArray();
  });

  it('should create the FilterArray', () => {
    expect(filters).toBeTruthy();
  });

  it('should get the filter with the correct paramName', () => {
    filters.push(
      new AutocompleteFilter('test', 'test', () => of()),
      new AutocompleteFilter('base', 'base', () => of())
    );

    expect(filters.get('test').paramName).toBe('test');
  });

  it('should throw error if there are two filters with the same name', () => {
    expect(() =>
      filters.push(
        new AutocompleteFilter('test', 'test', () => of()),
        new AutocompleteFilter('test', 'base', () => of())
      )
    ).toThrow();
  });
});
