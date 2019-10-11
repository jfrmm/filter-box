import { FormControl } from '@angular/forms';

import { Type } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterDisabledEvent } from '../../events/filter-disabled-event';
import { FilterEmptyEvent } from '../../events/filter-empty-event';
import { FilterEnabledEvent } from '../../events/filter-enabled-event';
import { FilterEvent } from '../../events/filter-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';

export abstract class GenericFilter {
  get param(): FilterParam {
    return {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
  }

  protected internalEvent: Subject<FilterEvent> = new Subject();

  public events: Observable<FilterEvent>;

  public formControl: FormControl;

  public type: string;

  constructor(
    public paramName: string,
    public placeholder: string,
    public getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    public initialValue: FilterOption | FilterOption[] = null,
    public component: Type<any>
  ) {
    this.formControl = new FormControl(initialValue);

    this.setEvents(this.formControl);
  }

  protected mapControlsValues(): string {
    return this.formControl.value ? this.formControl.value.id.toString() : null;
  }

  public clearFilter(emit: boolean = false): FilterEvent {
    this.formControl.setValue('', { emitEvent: emit });

    if (emit) {
      return new FilterEvent(new FilterEmptyEvent(), this);
    }

    return new FilterEvent(new FilterClearEvent(), this);
  }

  public disableFilter(): FilterEvent {
    this.formControl.disable({ onlySelf: true, emitEvent: false });

    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public enableFilter(): FilterEvent {
    this.formControl.enable({ onlySelf: true, emitEvent: false });

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
    this.formControl.setValue(value, { onlySelf: true, emitEvent: false });

    return new FilterEvent(new FilterValidValueChangeEvent(), this);
  }
}
