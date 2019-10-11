import { CheckboxFilter } from './checkbox-filter';

describe('CheckboxFilter', () => {
  let checkboxFilter: CheckboxFilter;

  beforeEach(() => {
    checkboxFilter = new CheckboxFilter('test', 'test', { id: 'testID', value: 'test' }, true);
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
    expect(checkboxFilter.param.name).toBe('testID');
    expect(checkboxFilter.param.value).toBe('test');
  });
});
