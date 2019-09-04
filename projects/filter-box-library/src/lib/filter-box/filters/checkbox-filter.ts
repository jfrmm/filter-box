import { FilterOption } from '../models/filter-option.model';
import { FilterModel } from '../models/filter.model';
import { FilterElement } from './filter-element';
import { FormControl } from '@angular/forms';
import { FilterParam } from '../models/filter-param.model';
import { Observable, merge, Subject } from 'rxjs';
import { FilterEvent } from '../events/filter-event';
import { map } from 'rxjs/operators';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';
import { FilterEmptyEvent } from '../events/filter-empty-event';
import { Type } from '@angular/core';
import { CheckboxComponent } from '../components/checkbox/checkbox.component';

export class CheckboxFilter implements FilterModel {
  private initialValuesIds: string[] | number[];

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
    return 'checkbox';
  }

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

  private buildFilterElements(): FilterElement[] {
    return this.initialOptions.map(
      option => new FilterElement(option.value, new FormControl(this.getOptionDefaultValue(option)))
    );
  }

  private getOptionDefaultValue(option: FilterOption): boolean {
    return this.initialValuesIds.some((id: number | string) => option.id === id);
  }

  private getOptionId(index: number): string {
    return this.initialOptions[index].id.toString();
  }

  private mapControlsValues(): string {
    const values = this.elements
      .map((element: FilterElement, index) => (element.formControl.value ? this.getOptionId(index) : null))
      .filter(value => value)
      .join(',');

    return values ? values : null;
  }

  private setEvents(): void {
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

  public enableFilter(index?: number): FilterEvent {
    if (index >= 0) {
      this.elements[index].formControl.enable({ onlySelf: true, emitEvent: false });
    } else {
      this.elements.forEach(element => element.formControl.enable({ onlySelf: true, emitEvent: false }));
    }
    return new FilterEvent(new FilterEnabledEvent(), this);
  }

  public disableFilter(index?: number): FilterEvent {
    if (index >= 0) {
      this.elements[index].formControl.disable({ onlySelf: true, emitEvent: false });
    } else {
      this.elements.forEach(element => element.formControl.disable({ onlySelf: true, emitEvent: false }));
    }
    return new FilterEvent(new FilterDisabledEvent(), this);
  }

  public setValue(value: any, index: number): FilterEvent {
    this.elements[index].formControl.setValue(value, { onlySelf: true, emitEvent: false });
    return new FilterEvent(new FilterValidValueChangeEvent(), this);
  }
}
