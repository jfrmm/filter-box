import { FilterOption } from './filter-option.model';
import { FilterParam } from './filter-param.model';
import { FilterElement } from '../filters/filter-element';
import { Observable } from 'rxjs';
import { FilterEvent } from '../events/filter-event';

export interface FilterModel {
  elements: FilterElement[];

  initialOptions?: FilterOption[] | Observable<FilterOption[]>;

  param: FilterParam;

  events: Observable<FilterEvent>;

  paramName: string;

  type: string;

  clearFilter(emit?: boolean, index?: number): FilterEvent;

  enableFilter(index?: number): FilterEvent;

  disableFilter(index?: number): FilterEvent;

  setValue(value: any, index?: number): FilterEvent;
}
