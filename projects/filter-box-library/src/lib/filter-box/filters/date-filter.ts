import { FilterModel } from '../models/filter.model';
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
import { FilterEmptyEvent } from '../events/filter-empty-event';
import { Type } from '@angular/core';
import { DateComponent } from '../components/date/date.component';

export class DateFilter implements FilterModel {
  private internalEvent: Subject<FilterEvent>;

  public elements: FilterElement;

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
  constructor(
    public paramName: string,
    public placeholder: string,
    public initialValue?: string,
    public component: Type<any> = DateComponent
  ) {
    this.internalEvent = new Subject();

    const initialDate: string = initialValue ? new Date(initialValue).toISOString() : null;

    const formControl = new FormControl(initialDate);

    this.events = new Observable();

    this.elements = new FilterElement(placeholder, formControl);

    this.setEvents(formControl);
  }

  private mapControlsValues(): string {
    return this.elements.formControl.value ? (this.elements.formControl.value as Date).toISOString() : null;
  }

  private setEvents(formControl: FormControl): void {
    this.events = merge(
      formControl.valueChanges.pipe(
        filter(value => (value === '' || value) && formControl.valid),
        map(value =>
          value === ''
            ? new FilterEvent(new FilterValidValueChangeEvent(), this)
            : new FilterEvent(new FilterClearEvent(), this)
        )
      ),
      this.internalEvent
    );
  }

  public clearFilter(emit: boolean = false): FilterEvent {
    this.elements.clear(emit);

    if (emit) {
      return new FilterEvent(new FilterEmptyEvent(), this);
    }

    return new FilterEvent(new FilterClearEvent(), this);
  }

  public enableFilter(): FilterEvent {
    this.elements.formControl.enable({ onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterEnabledEvent(), this);
  }

  public disableFilter(): FilterEvent {
    this.elements.formControl.disable({ onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public setValue(value: any): FilterEvent {
    this.elements.formControl.setValue(value, { onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterValidValueChangeEvent(), this);
  }
}
