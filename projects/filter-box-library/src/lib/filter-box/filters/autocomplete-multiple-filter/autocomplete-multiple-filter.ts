import { SelectionModel } from '@angular/cdk/collections';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteMultipleComponent } from '../../components/autocomplete-multiple/autocomplete-multiple.component';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { AutocompleteFilter } from '../autocomplete-filter/autocomplete-filter';

export class AutocompleteMultipleFilter extends AutocompleteFilter {
  get type(): string {
    return 'autocomplete-multiple';
  }

  public selection: SelectionModel<FilterOption>;

  constructor(
    paramName: string,
    placeholder: string,
    getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    initialValue: FilterOption[] = null,
    component: Type<any> = AutocompleteMultipleComponent
  ) {
    super(paramName, placeholder, getFilterOptions, initialValue, component);

    this.selection = new SelectionModel<FilterOption>(true, initialValue);
  }

  protected mapControlsValues(): string {
    const formValue: FilterOption[] = this.formControl.value;

    return formValue ? formValue.map((option: FilterOption) => option.id.toString()).join(',') : null;
  }
}
