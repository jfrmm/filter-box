import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { CheckboxFilter } from './checkbox-filter';

describe('CheckboxFilter', () => {
  let checkboxFilter: CheckboxFilter;

  beforeEach(() => {
    checkboxFilter = new CheckboxFilter('test', 'test', 'test', { id: 'testID', value: 'test' }, true);
  });

  it('should create an instance', () => {
    expect(checkboxFilter).toBeTruthy();
  });

  it(`should initialize the initial value`, () => {
    expect(checkboxFilter.formControl.value).toBe(true);
  });

  it(`should return the correct type`, () => {
    expect(checkboxFilter.type).toBe('checkbox');
  });

  it(`should map the id`, () => {
    expect(checkboxFilter.param.name).toBe('test');
    expect(checkboxFilter.param.value).toBe('testID');

    checkboxFilter.formControl.setValue(null);
    expect(checkboxFilter.param.value).toBeNull();
  });

  it('should return the Filter Clear Event', async => {
    checkboxFilter.events.subscribe(event => {
      expect(event instanceof FilterClearEvent).toBeTruthy();
      async();
    });

    checkboxFilter.formControl.setValue(false);
  });

  it('should return the Filter Valid Value Event', async => {
    checkboxFilter.formControl.setValue(false);

    checkboxFilter.events.subscribe(event => {
      expect(event instanceof FilterValidValueChangeEvent).toBeTruthy();
      async();
    });

    checkboxFilter.formControl.setValue(true);
  });
});
