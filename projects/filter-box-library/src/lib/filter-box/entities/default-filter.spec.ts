import { DefaultFilter } from './default-filter';

describe('DefaultFilter', () => {
  it('should create an instance', () => {
    expect(new DefaultFilter('test', 'test1', [])).toBeTruthy();
  });
});
