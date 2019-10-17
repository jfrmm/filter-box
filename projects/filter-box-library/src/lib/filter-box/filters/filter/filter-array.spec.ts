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

  it('should get the filter with the correct name', () => {
    filters.push(
      new AutocompleteFilter('test', 'test', 'test', () => of()),
      new AutocompleteFilter('base', 'base', 'base', () => of())
    );

    expect(filters.get('test').name).toBe('test');
  });

  it('should throw error if there are two filters with the same name', () => {
    expect(() =>
      filters.push(
        new AutocompleteFilter('test', 'test', 'test', () => of()),
        new AutocompleteFilter('test', 'test', 'base', () => of())
      )
    ).toThrow();
  });

  // it('should group filters by group id', () => {

  // });
});
