import { FilterOption } from './filter-option.model';
import { FilterParam } from './filter-param.model';
import { FilterElement } from '../filters/filter-element';
import { Observable } from 'rxjs';
import { FilterEvent } from '../events/filter-event';
import { Type } from '@angular/core';

export interface FilterModel {
  component: Type<any>;

  elements: FilterElement[] | FilterElement;

  events: Observable<FilterEvent>;

  initialOptions?: FilterOption[] | Observable<FilterOption[]>;

  param: FilterParam;

  paramName: string;

  type: string;

  /**
   * Emit defaults to false, if true it returns a FilterEmptyEvent
   */
  clearFilter(emit?: boolean, index?: number): FilterEvent;

  enableFilter(index?: number): FilterEvent;

  disableFilter(index?: number): FilterEvent;

  setValue(value: any, index?: number): FilterEvent;
}
