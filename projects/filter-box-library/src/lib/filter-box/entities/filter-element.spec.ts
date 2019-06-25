import { FilterElement } from './filter-element';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';

describe('FilterElement', () => {
  it('should create an instance', () => {
    expect(new FilterElement('test', new FormControl(), of([]))).toBeTruthy();
  });
});
