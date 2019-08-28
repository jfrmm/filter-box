import { DateFilter } from './date-filter';

describe('DateFilter', () => {
  let dateFilter: DateFilter;

  beforeEach(() => {
    dateFilter = new DateFilter('MOCK', 'MOCK');
  });

  it('should create an instance', () => {
    expect(dateFilter).toBeDefined();
  });

  it('should set the filter value', () => {
    dateFilter.setValue('MOCK');

    expect(dateFilter.filterElement.formControl.value).toBe('MOCK');
  });

  it('should clear the filter value', () => {
    dateFilter.clearFilter();

    expect(dateFilter.filterElement.formControl.value).toBe('');
  });

  it('should disable & enable the filter', () => {
    dateFilter.disableFilter();

    expect(dateFilter.filterElement.formControl.disabled).toBeTruthy();

    dateFilter.enableFilter();

    expect(dateFilter.filterElement.formControl.enabled).toBeTruthy();
  });
});
