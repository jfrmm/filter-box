import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterDisabledEvent } from '../../events/filter-disabled-event';
import { FilterEmptyEvent } from '../../events/filter-empty-event';
import { FilterEnabledEvent } from '../../events/filter-enabled-event';
import { FilterEvent } from '../../events/filter-event';
import { FilterValidValueChangeEvent } from '../../events/filter-valid-value-change-event';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { FilterModel } from '../../models/filter.model';
import { FilterElement } from '../filter-element';

export class CheckboxFilter implements FilterModel {

  get param(): FilterParam {
    const filterParam: FilterParam = {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
    return filterParam;
  }

  get type(): string {
    return 'checkbox';
  }
  protected initialValuesIds: string[] | number[];

  protected internalEvent: Subject<FilterEvent>;

  public elements: FilterElement[];

  public events: Observable<FilterEvent>;

  public initialOptions: FilterOption[];

  constructor(
    public paramName: string,
    options: FilterOption[],
    initialValuesIds: string[] | number[] = [],
    public component: Type<any> = CheckboxComponent
  ) {
    this.internalEvent = new Subject();

    this.paramName = paramName;

    this.initialOptions = options;

    this.initialValuesIds = initialValuesIds;

    this.elements = this.buildFilterElements();

    this.setEvents();
  }

  protected buildFilterElements(): FilterElement[] {
    return this.initialOptions.map(
      option => new FilterElement(option.value, new FormControl(this.getOptionDefaultValue(option)))
    );
  }

  protected getOptionDefaultValue(option: FilterOption): boolean {
    return this.initialValuesIds.some((id: number | string) => option.id === id);
  }

  protected getOptionId(index: number): string {
    return this.initialOptions[index].id.toString();
  }

  protected mapControlsValues(): string {
    const values = this.elements
      .map((element: FilterElement, index) => (element.formControl.value ? this.getOptionId(index) : null))
      .filter(value => value)
      .join(',');

    return values ? values : null;
  }

  public clearFilter(emit: boolean = false, index?: number): FilterEvent {
    if (index >= 0) {
      this.elements[index].clear(emit);
    } else {
      this.elements.forEach(element => element.clear(emit));
    }

    if (emit) {
      return new FilterEvent(new FilterEmptyEvent(), this);
    }

    return new FilterEvent(new FilterClearEvent(), this);
  }

  public disableFilter(index?: number): FilterEvent {
    if (index >= 0) {
      this.elements[index].formControl.disable({ onlySelf: true, emitEvent: false });
    } else {
      this.elements.forEach(element => element.formControl.disable({ onlySelf: true, emitEvent: false }));
    }
    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public enableFilter(index?: number): FilterEvent {
    if (index >= 0) {
      this.elements[index].formControl.enable({ onlySelf: true, emitEvent: false });
    } else {
      this.elements.forEach(element => element.formControl.enable({ onlySelf: true, emitEvent: false }));
    }
    return new FilterEvent(new FilterEnabledEvent(), this);
  }

  public setEvents(): void {
    this.events = new Observable();
    this.elements.forEach(
      element =>
        (this.events = merge(
          this.events,
          element.formControl.valueChanges.pipe(
            map(value =>
              value
                ? new FilterEvent(new FilterValidValueChangeEvent(), this)
                : new FilterEvent(new FilterClearEvent(), this)
            )
          )
        ))
    );

    this.events = merge(this.events, this.internalEvent);
  }

  public setValue(value: any, index: number): FilterEvent {
    this.elements[index].formControl.setValue(value, { onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterValidValueChangeEvent(), this);
  }
}
