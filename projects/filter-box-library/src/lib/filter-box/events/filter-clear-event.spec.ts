import { Filter } from '../filters/filter/filter';
import { FilterClearEvent } from './filter-clear-event';

class MockFilter extends Filter {}

describe('ClearEvent', () => {
  let mockFilter: MockFilter;

  beforeEach(() => {
    mockFilter = new MockFilter('test', 'test', null, null, null);
  });

  it('should create an instance', () => {
    expect(new FilterClearEvent(mockFilter)).toBeTruthy();
  });
});
