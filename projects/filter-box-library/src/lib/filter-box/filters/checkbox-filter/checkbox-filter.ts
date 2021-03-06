import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { FilterOption } from '../../models/filter-option.model';
import { Filter } from '../filter/filter';

export class CheckboxFilter extends Filter {
  get type(): string {
    return 'checkbox';
  }

  constructor(
    name: string,
    paramName: string,
    placeholder: string,
    private readonly option: FilterOption,
    initialValue: boolean = false,
    public groupId: string = null,
    component: Type<any> = CheckboxComponent
  ) {
    super(name, paramName, placeholder, null, initialValue, component);
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
        map((value: boolean) => (value ? new FilterValidValueChangeEvent(this) : new FilterClearEvent(this)))
      ),
      this.internalEvent
    );
  }
}
