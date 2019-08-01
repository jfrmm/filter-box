import { FormControl } from '@angular/forms';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FilterElement } from './filter-element';
import { Filter } from './filter';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { EventEmitter } from '@angular/core';
import { FilterBoxEvent } from './filter-box-event';

export class AutocompleteAsyncFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  public elements: FilterElement[];

  public eventEmitter: EventEmitter<FilterBoxEvent>;

  public initialOptions: Observable<FilterOption[]>;

  public params: Observable<FilterParam>;

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
    this.params = new Subject();

    this.paramName = paramName;

    const formControl = new FormControl('');

    this.setParams(formControl);

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

  /**
   * Params will emit a value when the param changes
   */
  private setParams(formControl: FormControl): void {
    this.params = formControl.valueChanges.pipe(
      filter(value => typeof value === 'object' || value === ''),
      map(() => this.param)
    );
  }

  public clearAllElements(): void {
    this.filterElement.clear();
  }
}
