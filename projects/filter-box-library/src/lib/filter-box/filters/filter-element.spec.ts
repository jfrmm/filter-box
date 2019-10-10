import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { FilterElement } from './filter-element';

describe('FilterElement', () => {
  it('should create an instance', () => {
    expect(new FilterElement('test', new FormControl(), of([]))).toBeTruthy();
  });
});
