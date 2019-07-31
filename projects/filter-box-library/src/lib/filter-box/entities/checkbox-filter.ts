import { FilterOption } from '../models/filter-option.model';
import { Filter } from './filter';
import { FilterElement } from './filter-element';
import { FormControl } from '@angular/forms';
import { FilterParam } from '../models/filter-param.model';
import { Subject, Subscription } from 'rxjs';
import { OnDestroy, EventEmitter } from '@angular/core';
import { FilterBoxEvent } from './filter-box-event';

export class CheckboxFilter implements Filter, OnDestroy {
  private initialValuesIds: string[] | number[];

  private subscription: Subscription;

  public elements: FilterElement[];

  public eventEmitter: EventEmitter<FilterBoxEvent>;

  public initialOptions: FilterOption[];

  public params: Subject<FilterParam>;

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
    this.subscription = new Subscription();

    this.params = new Subject();

    this.paramName = paramName;

    this.initialOptions = options;

    this.initialValuesIds = initialValuesIds;

    this.elements = this.buildFilterElements();

    this.subscribeToParamValueChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  private subscribeToParamValueChanges(): void {
    this.elements.forEach(element =>
      this.subscription.add(element.formControl.valueChanges.subscribe(() => this.params.next(this.param)))
    );
  }

  public clearAllElements(): void {
    this.elements.forEach(element => element.clear());
  }
}
