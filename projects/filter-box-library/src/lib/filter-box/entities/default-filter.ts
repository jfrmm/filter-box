import { FilterElement } from './filter-element';
import { FilterOption } from '../models/filter-option.model';
import { FormControl } from '@angular/forms';
import { Filter } from './filter';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FilterParam } from '../models/filter-param.model';

export class DefaultFilter extends Filter {
  private _filterElement: FilterElement;

  constructor(paramName: string, placeholder: string, options: FilterOption[], initialValue: FilterOption = null) {
    super(paramName, options, 'default');

    const formControl = new FormControl(initialValue);

    this._filterElement = new FilterElement(placeholder, formControl, this.filterOptions(formControl));

    this.elements = [this._filterElement];
  }

  private filterOptions(formControl: FormControl): Observable<FilterOption[]> {
    return formControl.valueChanges.pipe(
      filter(option => typeof option === 'string' || option === null),
      map(option => (option ? option : '')),
      /* With startwith the list is displayed as soon as focused
       * without it, it will be empty first time its focused, until user types something
       */
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) =>
        of(
          this._initialOptions.filter((option: FilterOption) =>
            option.value.toLowerCase().includes(filterTerm.toLowerCase())
          )
        )
      )
    );
  }

  protected getFilterParam(): FilterParam {
    const filterParam: FilterParam = {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
    return filterParam;
  }

  protected mapControlsValues(): string {
    return this._filterElement.formControl.value ? this._filterElement.formControl.value.id : null;
  }

  public clearAllElements(): void {
    this._filterElement.clear();
  }
}
