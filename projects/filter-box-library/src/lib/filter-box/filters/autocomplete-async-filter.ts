import { FormControl } from '@angular/forms';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, merge, Subject } from 'rxjs';
import { FilterElement } from './filter-element';
import { FilterModel } from '../models/filter.model';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterEvent } from '../events/filter-event';
import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';

export class AutocompleteAsyncFilter implements FilterModel {
  private internalEvent: Subject<FilterEvent>;

  public elements: FilterElement[];

  public initialOptions: Observable<FilterOption[]>;

  public events: Observable<FilterEvent>;

  get filterElement(): FilterElement {
    return this.elements[0];
  }

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
    this.internalEvent = new Subject();

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
    this.events = merge(
      formControl.valueChanges.pipe(
        filter(value => typeof value === 'object' || value === ''),
        map(value =>
          typeof value === 'object'
            ? new FilterEvent(new FilterValidValueChangeEvent(), this)
            : new FilterEvent(new FilterClearEvent(), this)
        )
      ),
      this.internalEvent
    );
  }

  public clearFilter(): FilterEvent {
    this.filterElement.clear();
    return new FilterEvent(new FilterClearEvent(), this);
  }

  public enableFilter(): FilterEvent {
    this.filterElement.formControl.enable({ onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterEnabledEvent(), this);
  }

  public disableFilter(): FilterEvent {
    this.filterElement.formControl.disable({ onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public setValue(value: any): FilterEvent {
    this.filterElement.formControl.setValue(value, { onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterValidValueChangeEvent(), this);
  }
}
