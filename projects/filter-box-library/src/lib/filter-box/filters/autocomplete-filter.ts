import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEmptyEvent } from '../events/filter-empty-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';
import { FilterEvent } from '../events/filter-event';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterModel } from '../models/filter.model';
import { FilterElement } from './filter-element';

export class AutocompleteFilter implements FilterModel {
  get param(): FilterParam {
    return {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
  }

  get type(): string {
    return 'autocomplete';
  }
  protected internalEvent: Subject<FilterEvent>;

  public elements: FilterElement;

  public events: Observable<FilterEvent>;

  public initialOptions: FilterOption[];

  public searchFormControl: FormControl;

  constructor(
    public paramName: string,
    public placeholder: string,
    public options: FilterOption[],
    initialValue: FilterOption = null,
    public getFilterOptions?: (params?: FilterParam[]) => Observable<FilterOption[]>,
    public component: Type<any> = AutocompleteComponent
  ) {
    this.internalEvent = new Subject();

    this.searchFormControl = new FormControl();

    this.initialOptions = options;

    this.options = options;

    const formControl = new FormControl(initialValue);

    this.setEvents(formControl);

    this.elements = new FilterElement(placeholder, formControl, this.filterOptions(formControl));

    this.elements.options = this.filterSearch();
  }

  private filterSearch(): Observable<FilterOption[]> {
    return this.searchFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) =>
        of(
          this.options.filter((filterOption: FilterOption) =>
            filterOption.value.toLowerCase().includes(filterTerm.toLowerCase())
          )
        )
      )
    );
  }

  protected filterOptions(formControl: FormControl): Observable<FilterOption[]> {
    return formControl.valueChanges.pipe(
      filter(option => typeof option === 'string' || option === null),
      map(option => (option ? option : '')),
      /* With startwith the list is displayed as soon as focused
       * without it, it will be empty first time its focused, until user types something
       */
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) =>
        of(this.options.filter((option: FilterOption) => option.value.toLowerCase().includes(filterTerm.toLowerCase())))
      )
    );
  }

  protected mapControlsValues(): string {
    return this.elements.formControl.value ? this.elements.formControl.value.id.toString() : null;
  }

  public clearFilter(emit: boolean = false): FilterEvent {
    this.elements.clear(emit);

    if (emit) {
      return new FilterEvent(new FilterEmptyEvent(), this);
    }

    return new FilterEvent(new FilterClearEvent(), this);
  }

  public disableFilter(): FilterEvent {
    this.elements.formControl.disable({ onlySelf: true, emitEvent: false });

    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public enableFilter(): FilterEvent {
    this.elements.formControl.enable({ onlySelf: true, emitEvent: false });

    return new FilterEvent(new FilterEnabledEvent(), this);
  }

  /**
   * Params will emit a value when the param changes
   */
  public setEvents(formControl: FormControl): void {
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

  public setValue(value: any): FilterEvent {
    this.elements.formControl.setValue(value, { onlySelf: true, emitEvent: false });

    return new FilterEvent(new FilterValidValueChangeEvent(), this);
  }

  public updateFilterOptions(params: FilterParam[]): FilterEvent {
    this.elements.formControl.disable({ emitEvent: false });
    this.getFilterOptions(params).subscribe(options => {
      this.options = options;
      this.elements.formControl.enable({ emitEvent: false });
      this.elements.options = this.filterOptions(this.elements.formControl);
    });

    return new FilterEvent(new FilterEmptyEvent(), this);
  }
}
