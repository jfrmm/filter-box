import { DateFilter } from './date-filter';

describe('DateFilter', () => {
  let dateFilter: DateFilter;

  beforeEach(() => {
    dateFilter = new DateFilter('MOCK', 'MOCK');
  });

  it('should create an instance', () => {
    expect(dateFilter).toBeDefined();
  });
});
