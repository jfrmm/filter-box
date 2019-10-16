import { of } from 'rxjs';
import { AutocompleteFilter } from './autocomplete-filter';

describe('AutocompleteFilter', () => {
  let autoCompleteFilter: AutocompleteFilter;
  const mockFunction = () => of(null);

  beforeEach(() => {
    autoCompleteFilter = new AutocompleteFilter('MOCK', 'MOCK', mockFunction);
  });

  it(`sould return the correct type`, () => {
    expect(autoCompleteFilter.type).toBe('autocomplete');
  });

  it('should create an instance', () => {
    expect(autoCompleteFilter).toBeDefined();
  });

  it('should have reactive options', () => {
    function updateOptions() {
      return of([{ id: 2, value: 'MOCK2' }]);
    }
    autoCompleteFilter.getFilterOptions = updateOptions;
    autoCompleteFilter.updateFilterOptions(null);

    expect(autoCompleteFilter.options).toEqual([{ id: 2, value: 'MOCK2' }]);
  });

  it('should filter the options', async => {
    autoCompleteFilter.options = [{ id: 1, value: 'test' }, { id: 2, value: 'angular' }];
    autoCompleteFilter.filteredOptions.subscribe(options => {
      expect(options[0]).toEqual({ id: 1, value: 'test' });

      async();
    });
    autoCompleteFilter.searchFormControl.setValue('tes');
  });
});
