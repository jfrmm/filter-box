import { FilterElement } from './filter-element';
import { FilterOption } from '../models/filter-option.model';
import { FormControl } from '@angular/forms';
import { Filter } from './filter';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FilterParam } from '../models/filter-param.model';
import { OnDestroy } from '@angular/core';

export class AutocompleteFilter implements Filter, OnDestroy {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  private subscription: Subscription;

  public elements: FilterElement[];

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
    return 'autocomplete';
  }

  constructor(
    public paramName: string,
    public placeholder: string,
    public options: FilterOption[],
    initialValue: FilterOption = null
  ) {
    this.subscription = new Subscription();

    this.params = new Subject();

    this.initialOptions = options;

    this.options = options;

    const formControl = new FormControl(initialValue);

    this.subscribeToParamValueChanges(formControl);

    this.elements = [new FilterElement(placeholder, formControl, this.filterOptions(formControl))];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private filterOptions(formControl: FormControl): Observable<FilterOption[]> {
    return formControl.valueChanges.pipe(
      filter(option => typeof option === 'string' || option === null),
      map(option => (option ? option : '')),
      /* With startwith the list is displayed as soon as focused
       * without it, it will be empty first time its focused, until user types something
       */
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) =>
        of(
          this.initialOptions.filter((option: FilterOption) =>
            option.value.toLowerCase().includes(filterTerm.toLowerCase())
          )
        )
      )
    );
  }

  private mapControlsValues(): string {
    return this.filterElement.formControl.value ? this.filterElement.formControl.value.id : null;
  }

  /**
   * Params will emit a value when the param changes
   */
  private subscribeToParamValueChanges(formControl: FormControl): void {
    this.subscription.add(
      formControl.valueChanges
        .pipe(filter(value => typeof value === 'object' || value === ''))
        .subscribe(() => this.params.next(this.param))
    );
  }

  public clearAllElements(): void {
    this.filterElement.clear();
  }
}
