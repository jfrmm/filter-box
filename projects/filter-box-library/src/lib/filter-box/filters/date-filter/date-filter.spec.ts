import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { DateFilter } from './date-filter';

describe('DateFilter', () => {
  let dateFilter: DateFilter;
  const mockDateValue = new Date('01-12-2019');

  beforeEach(() => {
    dateFilter = new DateFilter('MOCK', 'MOCK', 'MOCK', '01-12-2019');
  });

  it('should create an instance', () => {
    expect(dateFilter).toBeDefined();
  });

  it('should return the date type', () => {
    expect(dateFilter.type).toBe('date');
  });

  it('should map the params', () => {
    expect(dateFilter.param.value).toBe(mockDateValue.toISOString());

    dateFilter.formControl.setValue(null);
    expect(dateFilter.param.value).toBeNull();
  });

  it('should set initial value to null', () => {
    const filter = new DateFilter('test', 'test', 'test');
    expect(filter.initialValue).toBe(null);
  });

  it('should return the Filter Valid Value Event', async => {
    dateFilter.events.subscribe(event => {
      expect(event instanceof FilterClearEvent).toBeTruthy();
      async();
    });

    dateFilter.formControl.setValue('');
  });

  it('should return the Filter Clear Event', async => {
    dateFilter.events.subscribe(event => {
      expect(event instanceof FilterValidValueChangeEvent).toBeTruthy();
      async();
    });

    dateFilter.formControl.setValue('asd');
  });
});
