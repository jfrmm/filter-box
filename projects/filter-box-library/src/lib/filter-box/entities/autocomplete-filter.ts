import { FilterElement } from './filter-element';
import { FilterOption } from '../models/filter-option.model';
import { FormControl } from '@angular/forms';
import { Filter } from './filter';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FilterParam } from '../models/filter-param.model';

export class AutocompleteFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  public elements: FilterElement[];

  public initialOptions: FilterOption[];

  public options: FilterOption[];

  public paramName: string;

  get param(): FilterParam {
    const filterParam: FilterParam = {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
    return filterParam;
  }

  get type(): string {
    return 'autocomplete';
  }

  constructor(paramName: string, placeholder: string, options: FilterOption[], initialValue: FilterOption = null) {
    this.paramName = paramName;
    this.initialOptions = options;
    this.options = options;

    const formControl = new FormControl(initialValue);

    this.elements = [new FilterElement(placeholder, formControl, this.filterOptions(formControl))];
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
          this.initialOptions.filter((option: FilterOption) =>
            option.value.toLowerCase().includes(filterTerm.toLowerCase())
          )
        )
      )
    );
  }

  private mapControlsValues(): string {
    return this.filterElement.formControl.value ? this.filterElement.formControl.value.id : null;
  }

  public clearAllElements(): void {
    this.filterElement.clear();
  }
}
