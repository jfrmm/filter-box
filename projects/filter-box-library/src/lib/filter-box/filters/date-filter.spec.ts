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

    expect(dateFilter.elements.formControl.value).toBe('MOCK');
  });

  it('should clear the filter value', () => {
    dateFilter.clearFilter();

    expect(dateFilter.elements.formControl.value).toBe('');
  });

  it('should disable & enable the filter', () => {
    dateFilter.disableFilter();

    expect(dateFilter.elements.formControl.disabled).toBeTruthy();

    dateFilter.enableFilter();

    expect(dateFilter.elements.formControl.enabled).toBeTruthy();
  });
});
