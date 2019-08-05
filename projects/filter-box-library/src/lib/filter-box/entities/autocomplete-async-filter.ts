import { FormControl } from '@angular/forms';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FilterElement } from './filter-element';
import { Filter } from './filter';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterBoxEvent } from './filter-box-event';
import { ClearEvent } from './clear-event';
import { ValidValueChangeEvent } from './valid-value-change-event';

export class AutocompleteAsyncFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  public elements: FilterElement[];

  public initialOptions: Observable<FilterOption[]>;

  public events: Observable<FilterBoxEvent>;

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
    const formControl = new FormControl('');

    this.setEvents(formControl);

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
  private setEvents(formControl: FormControl): void {
    this.events = formControl.valueChanges.pipe(
      filter(value => typeof value === 'object' || value === ''),
      map(value => (typeof value === 'object' ? new ValidValueChangeEvent() : new ClearEvent()))
    );
  }

  public clearAllElements(emit?: boolean): void {
    this.filterElement.clear(emit);

    // this.eventEmitter.emit(new ClearEvent());
  }
}
