import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import { TextComponent } from '../../components/text/text.component';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { Filter } from '../filter/filter';

export class TextFilter extends Filter {
  get type(): string {
    return 'text';
  }

  constructor(
    name: string,
    paramName: string,
    placeholder: string,
    initialValue: FilterOption | FilterOption[] = null,
    component: Type<any> = TextComponent
  ) {
    super(name, paramName, placeholder, null, initialValue, component);
  }

  protected mapControlsValues(): string {
    return this.formControl.value ? this.formControl.value : null;
  }

  /**
   * Params will emit a value when the param changes
   */
  public setEvents(formControl: FormControl): void {
    this.events = merge(
      formControl.valueChanges.pipe(
        debounceTime(500),
        startWith(''),
        distinctUntilChanged(),
        map((value: string) => (value ? new FilterValidValueChangeEvent(this) : new FilterClearEvent(this)))
      ),
      this.internalEvent
    );
  }
}
