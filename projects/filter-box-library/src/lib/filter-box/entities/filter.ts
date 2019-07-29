import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterElement } from './filter-element';
import { Observable, Subject } from 'rxjs';

export interface Filter {
  elements: FilterElement[];

  initialOptions?: FilterOption[] | Observable<FilterOption[]>;

  /** Like angular router, we expose param as a single param value
   * and params as a stream os params
   */
  param: FilterParam;

  params: Subject<FilterParam>;

  paramName: string;

  type: string;

  clearAllElements(): void;
}
