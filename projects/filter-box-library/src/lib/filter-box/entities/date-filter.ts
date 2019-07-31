import { Filter } from './filter';
import { FilterElement } from './filter-element';
import { FilterParam } from '../models/filter-param.model';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { OnDestroy, EventEmitter } from '@angular/core';
import { FilterBoxEvent } from './filter-box-event';

export class DateFilter implements Filter, OnDestroy {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  eventEmitter: EventEmitter<FilterBoxEvent>;

  private subscription: Subscription;

  public elements: FilterElement[];

  public params: Subject<FilterParam>;

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
  constructor(public paramName: string, public placeholder: string, public initialValue?: string) {
    this.subscription = new Subscription();

    this.params = new Subject();

    const initialDate: string = initialValue ? new Date(initialValue).toISOString() : null;

    const formControl = new FormControl(initialDate);

    this.elements = [new FilterElement(placeholder, formControl)];

    this.subscribeToParamValueChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private mapControlsValues(): string {
    return this.filterElement.formControl.value ? (this.filterElement.formControl.value as Date).toISOString() : null;
  }

  private subscribeToParamValueChanges(): void {
    this.elements.forEach(element =>
      this.subscription.add(element.formControl.valueChanges.subscribe(() => this.params.next(this.param)))
    );
  }

  public clearAllElements(): void {
    this.filterElement.clear();
  }
}
