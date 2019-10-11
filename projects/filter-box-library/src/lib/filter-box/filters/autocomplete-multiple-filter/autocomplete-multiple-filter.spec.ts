import { asyncScheduler, of } from 'rxjs';
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
  });
});
