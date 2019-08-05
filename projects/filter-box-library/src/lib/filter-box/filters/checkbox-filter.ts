import { FilterOption } from '../models/filter-option.model';
import { Filter } from './filter';
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

export class CheckboxFilter implements Filter {
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

  constructor(public paramName: string, options: FilterOption[], initialValuesIds: string[] | number[] = []) {
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
            map(value => (value ? new FilterValidValueChangeEvent() : new FilterClearEvent()))
          )
        ))
    );

    this.events = merge(this.events, this.internalEvent);
  }

  public clearFilter(emit?: boolean): void {
    this.elements.forEach(element => element.clear(emit));
  }

  public disableFilter(): void {
    this.elements.forEach(element => element.formControl.disable());
    this.internalEvent.next(new FilterDisabledEvent());
  }

  public enableFilter(): void {
    this.elements.forEach(element => element.formControl.enable());
    this.internalEvent.next(new FilterEnabledEvent());
  }
}
