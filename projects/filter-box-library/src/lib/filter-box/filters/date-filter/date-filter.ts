import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DateComponent } from '../../components/date/date.component';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterEvent } from '../../events/filter-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { GenericFilter } from '../generic-filter/generic-filter';

export class DateFilter extends GenericFilter {
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
    public initialValue: string = '',
    public component: Type<any> = DateComponent
  ) {
    super(paramName, placeholder, null, initialValue, component);
  }

  protected mapControlsValues(): string {
    return this.formControl.value ? (this.formControl.value as Date).toISOString() : null;
  }

  public setEvents(formControl: FormControl): void {
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
}
