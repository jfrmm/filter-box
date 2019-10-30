import { Injectable } from '@angular/core';

import { FilterOption } from '../models/filter-option.model';

@Injectable({
  providedIn: 'root',
})
export class FilterHelperService {
  constructor() {}

  public compareFn(o1: FilterOption, o2: FilterOption): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  public displayFilter(filterOption?: FilterOption): string | undefined {
    return filterOption ? filterOption.value : undefined;
  }
}
