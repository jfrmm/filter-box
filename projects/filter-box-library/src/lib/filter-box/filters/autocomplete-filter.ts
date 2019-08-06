import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';
import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { Observable, of, merge, Subject } from 'rxjs';
import { FilterEvent } from '../events/filter-event';
import { FilterElement } from './filter-element';
import { FormControl } from '@angular/forms';
import { Filter } from './filter';

export class AutocompleteFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  private internalEvent: Subject<FilterEvent>;

  public elements: FilterElement[];

  public initialOptions: FilterOption[];

  public events: Observable<FilterEvent>;

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

  constructor(
    public paramName: string,
    public placeholder: string,
    public options: FilterOption[],
    initialValue: FilterOption = null
  ) {
    this.internalEvent = new Subject();

    this.initialOptions = options;

    this.options = options;

    const formControl = new FormControl(initialValue);

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

  public clearFilter(emit?: boolean): FilterEvent {
    this.filterElement.clear(emit);
    return new FilterEvent(new FilterClearEvent(), this);
  }

  public disableFilter(): FilterEvent {
    this.filterElement.formControl.disable({ onlySelf: true, emitEvent: false });
    // this.internalEvent.next(new FilterEvent(new FilterDisabledEvent(), this));
    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public enableFilter(): FilterEvent {
    this.filterElement.formControl.enable({ onlySelf: true, emitEvent: false });
    // this.internalEvent.next(new FilterEvent(new FilterEnabledEvent(), this));
    return new FilterEvent(new FilterEnabledEvent(), this);
  }
}
