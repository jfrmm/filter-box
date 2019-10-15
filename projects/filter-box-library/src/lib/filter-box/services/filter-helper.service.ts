import { Injectable } from '@angular/core';

import { FilterOption } from '../models/filter-option.model';

@Injectable({
  providedIn: 'root',
})
export class FilterHelperService {
  constructor() {}

  public displayFilter(filterOption?: FilterOption): string | undefined {
    return filterOption ? filterOption.value : undefined;
  }
}
