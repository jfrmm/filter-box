import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterEvent } from '../events/filter-event';
import { FilterElement } from '../filters/filter-element';
import { FilterOption } from './filter-option.model';
import { FilterParam } from './filter-param.model';

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

  disableFilter(index?: number): FilterEvent;

  enableFilter(index?: number): FilterEvent;

  setEvents(formControl?: FormControl): void;

  setValue(value: any, index?: number): FilterEvent;
}
