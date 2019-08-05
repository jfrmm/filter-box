import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterElement } from './filter-element';
import { Observable } from 'rxjs';
import { FilterBoxEvent } from './filter-box-event';

export interface Filter {
  elements: FilterElement[];

  initialOptions?: FilterOption[] | Observable<FilterOption[]>;

  param: FilterParam;

  events: Observable<FilterBoxEvent>;

  paramName: string;

  type: string;

  clearAllElements(emit?: boolean): void;
}
