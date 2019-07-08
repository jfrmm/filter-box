import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterElement } from './filter-element';
import { Observable } from 'rxjs';

export interface Filter {
  elements: FilterElement[];

  initialOptions: FilterOption[] | Observable<FilterOption[]>;

  param: FilterParam;

  paramName: string;

  type: string;

  clearAllElements(): void;
}
