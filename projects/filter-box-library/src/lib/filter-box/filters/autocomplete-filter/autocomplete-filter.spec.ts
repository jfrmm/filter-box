import { asyncScheduler, of } from 'rxjs';
import { AutocompleteFilter } from './autocomplete-filter';

describe('AutocompleteFilter', () => {
  let autoCompleteFilter: AutocompleteFilter;
  const mockFunction = () => of(null, asyncScheduler);

  beforeEach(() => {
    autoCompleteFilter = new AutocompleteFilter('MOCK', 'MOCK', mockFunction);
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
});
