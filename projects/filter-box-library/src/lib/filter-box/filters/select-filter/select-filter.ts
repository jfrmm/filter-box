import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectComponent } from '../../components/select/select.component';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { Filter } from '../filter/filter';

export class SelectFilter extends Filter {
  get type(): string {
    return 'select';
  }

  public options: Observable<FilterOption[]>;

  constructor(
    name: string,
    paramName: string,
    placeholder: string,
    getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    initialValue: FilterOption | FilterOption[] = null,
    component: Type<any> = SelectComponent
  ) {
    super(name, paramName, placeholder, getFilterOptions, initialValue, component);

    this.options = this.getFilterOptions();
  }
}
