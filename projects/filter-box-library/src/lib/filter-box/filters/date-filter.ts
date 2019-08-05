import { Filter } from './filter';
import { FilterElement } from './filter-element';
import { FilterParam } from '../models/filter-param.model';
import { FormControl } from '@angular/forms';
import { Observable, merge, Subject } from 'rxjs';
import { FilterEvent } from '../events/filter-event';
import { map, filter } from 'rxjs/operators';
import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';

export class DateFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  private internalEvent: Subject<FilterEvent>;

  public elements: FilterElement[];

  public events: Observable<FilterEvent>;

  /**
   * TODO: Value being returned is of type date.
   * Should we parse it here?
   */
  get param(): FilterParam {
    const filterParam: FilterParam = {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
    return filterParam;
  }

  get type(): string {
    return 'date';
  }

  /**
   *  TODO: Should we pass the date output format as an argument,
   * also, should we pass an optional parameter containing the datepicker options?
   */
  constructor(public paramName: string, public placeholder: string, public initialValue?: string) {
    this.internalEvent = new Subject();

    const initialDate: string = initialValue ? new Date(initialValue).toISOString() : null;

    const formControl = new FormControl(initialDate);

    this.events = new Observable();

    this.elements = [new FilterElement(placeholder, formControl)];

    this.setParams();
  }

  private mapControlsValues(): string {
    return this.filterElement.formControl.value ? (this.filterElement.formControl.value as Date).toISOString() : null;
  }

  private setParams(): void {
    this.elements.forEach(
      element =>
        (this.events = merge(
          this.events,
          element.formControl.valueChanges.pipe(
            filter(value => (value === '' || value) && element.formControl.valid),
            map(value => (value === '' ? new FilterClearEvent() : new FilterValidValueChangeEvent()))
          )
        ))
    );

    this.events = merge(this.events, this.internalEvent);
  }

  public clearFilter(emit?: boolean): void {
    this.filterElement.clear(emit);
  }

  public disableFilter(): void {
    this.filterElement.formControl.disable();
    this.internalEvent.next(new FilterDisabledEvent());
  }

  public enableFilter(): void {
    this.filterElement.formControl.enable();
    this.internalEvent.next(new FilterEnabledEvent());
  }
}
