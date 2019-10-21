import { asyncScheduler, Observable, of } from 'rxjs';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterEmptyEvent } from '../../events/filter-empty-event';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { Filter } from './filter';

class MockClass extends Filter {
  constructor(
    name: string,
    paramName: string,
    placeholder: string,
    getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    initialValue: FilterOption | FilterOption[] = null
  ) {
    super(name, paramName, placeholder, getFilterOptions, initialValue, null);
  }
}

describe('Filter', () => {
  const mockElement: FilterOption = { id: 1, value: 'test' };
  const mockParam: FilterParam = { name: 'test', value: 'test' };
  let mockClass: MockClass;

  beforeEach(() => {
    mockClass = new MockClass('test', 'test', 'test', () => of([mockElement], asyncScheduler), null);
  });

  it(`should create an instance`, () => {
    expect(mockClass).toBeDefined();
  });

  it(`should return params correctly mapped`, () => {
    expect(mockClass.param.value).toBeNull();

    mockClass.formControl.setValue(mockElement);

    expect(mockClass.param.value).toBe(mockElement.id.toString());
    expect(mockClass.param.name).toBe(mockClass.paramName);
  });

  it(`should set the value`, () => {
    mockClass.setValue(mockElement);

    expect(mockClass.formControl.value).toBe(mockElement);
  });

  it(`should clear the filter`, () => {
    mockClass.formControl.setValue(mockElement);

    let event = mockClass.clearFilter();
    expect(event instanceof FilterClearEvent).toBeTruthy();

    mockClass.formControl.setValue(mockElement);
    event = mockClass.clearFilter(true);
    expect(event instanceof FilterEmptyEvent).toBeTruthy();
  });

  it(`should disable the filter`, () => {
    expect(mockClass.formControl.disabled).toBeFalsy();

    mockClass.disableFilter();
    expect(mockClass.formControl.disabled).toBeTruthy();
  });

  it(`should enable the filter`, () => {
    mockClass.formControl.disable();
    expect(mockClass.formControl.disabled).toBeTruthy();

    mockClass.enableFilter();
    expect(mockClass.formControl.disabled).toBeFalsy();
  });

  it(`should set isRequesting`, () => {
    mockClass.setIsRequesting();
    expect(mockClass.isRequesting).toBe(true);
    expect(mockClass.formControl.enabled).toBe(false);
  });

  it(`should unset isRequesting`, () => {
    mockClass.unsetIsRequesting();
    expect(mockClass.isRequesting).toBe(false);
    expect(mockClass.formControl.enabled).toBe(true);
  });
});
