import { of } from 'rxjs';
import { AutocompleteFilter } from '../autocomplete-filter/autocomplete-filter';
import { CheckboxFilter } from '../checkbox-filter/checkbox-filter';
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

  it('should group filters by group id', () => {
    filters.push(
      new CheckboxFilter('test', 'rating', 'Rating', { id: 1, value: 'test' }, false, 'RATING'),
      new CheckboxFilter('test1', 'rating', 'Rating', { id: 1, value: 'test' }, false, 'RATING'),
      new CheckboxFilter('stuff', 'stuff', 'Stuff', { id: 2, value: 'MEDIUM' }, false, 'STUFF'),
      new CheckboxFilter('stuff_2', 'stuff', 'Stuff2', { id: 2, value: 'HIGH' }, false, 'STUFF'),
      new CheckboxFilter('alone', 'alone', 'Alone', { id: 2, value: 'HIGH' }, false, 'ALONE'),
      new CheckboxFilter('alone2', 'alone', 'Alone', { id: 2, value: 'HIGH' }, false)
    );

    const groupedFilters = filters.groupByGroupId((filters as unknown) as CheckboxFilter[]);

    // Only three because filters without group id are rejected
    expect(Object.values(groupedFilters).length).toBe(3);
  });

  it('should return queryParams as string', () => {
    filters.push(
      new CheckboxFilter('test', 'rating', 'Rating', { id: 1, value: 'test' }, true),
      new CheckboxFilter('test1', 'check', 'check', { id: 1, value: 'check' }, true),
      new CheckboxFilter('stuff', 'stuff', 'Stuff', { id: 2, value: 'MEDIUM' }, true, 'STUFF'),
      new CheckboxFilter('stuff_2', 'stuff', 'Stuff2', { id: 3, value: 'HIGH' }, true, 'STUFF'),
      new CheckboxFilter('stuff_3', 'stuff', 'Stuff2', { id: 3, value: 'HIGH' }, false, 'STUFF')
    );

    expect(filters.toQueryParam()).toBe('rating=1&check=1&stuff=2,3');
  });
});
