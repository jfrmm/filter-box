import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterEvent } from '../../events/filter-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { FilterOption } from '../../models/filter-option.model';
import { GenericFilter } from '../generic-filter/generic-filter';

export class CheckboxFilter extends GenericFilter {
  get type(): string {
    return 'checkbox';
  }

  constructor(
    paramName: string,
    placeholder: string,
    private readonly option: FilterOption,
    initialValue: boolean = false,
    component: Type<any> = CheckboxComponent
  ) {
    super(paramName, placeholder, null, initialValue, component);
  }

  protected mapControlsValues(): string {
    return this.formControl.value ? this.option.id.toString() : null;
  }

  /**
   * Params will emit a value when the param changes
   */
  public setEvents(formControl: FormControl): void {
    this.events = merge(
      formControl.valueChanges.pipe(
        map((value: boolean) =>
          value
            ? new FilterEvent(new FilterValidValueChangeEvent(), this)
            : new FilterEvent(new FilterClearEvent(), this)
        )
      ),
      this.internalEvent
    );
  }
}
