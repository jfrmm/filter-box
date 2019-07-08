import { FormControl } from '@angular/forms';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FilterElement } from './filter-element';
import { Filter } from './filter';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';

export class AutocompleteAsyncFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  public elements: FilterElement[];

  public initialOptions: Observable<FilterOption[]>;

  get param(): FilterParam {
    const filterParam: FilterParam = {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
    return filterParam;
  }

  get type(): string {
    return 'autocomplete-async';
  }

  constructor(
    public paramName: string,
    public placeholder: string,
    private getAsyncOptions: (filterTerm?: string) => Observable<FilterOption[]>
  ) {
    this.paramName = paramName;

    const formControl = new FormControl('');

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
      switchMap((filterTerm: string) => this.getAsyncOptions(filterTerm))
    );
  }

  private mapControlsValues(): string {
    return this.filterElement.formControl.value ? this.filterElement.formControl.value.id : null;
  }

  public clearAllElements(): void {
    this.filterElement.clear();
  }
}
