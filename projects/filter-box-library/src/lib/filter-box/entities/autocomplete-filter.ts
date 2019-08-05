import { FilterElement } from './filter-element';
import { FilterOption } from '../models/filter-option.model';
import { FormControl } from '@angular/forms';
import { Filter } from './filter';
import { Observable, of } from 'rxjs';
import { filter, map, startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FilterParam } from '../models/filter-param.model';
import { FilterBoxEvent } from './filter-box-event';
import { ClearEvent } from './clear-event';
import { ValidValueChangeEvent } from './valid-value-change-event';

export class AutocompleteFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  public elements: FilterElement[];

  public initialOptions: FilterOption[];

  public events: Observable<FilterBoxEvent>;

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
    this.initialOptions = options;

    this.options = options;

    const formControl = new FormControl(initialValue);

    this.setEvents(formControl);

    this.elements = [new FilterElement(placeholder, formControl, this.filterOptions(formControl))];
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
  private setEvents(formControl: FormControl): void {
    this.events = formControl.valueChanges.pipe(
      filter(value => typeof value === 'object' || value === ''),
      map(value => (typeof value === 'object' ? new ValidValueChangeEvent() : new ClearEvent()))
    );
  }

  public clearAllElements(emit?: boolean): void {
    this.filterElement.clear(emit);
    // this.eventEmitter.emit(new ClearEvent()); //TODO: maybe remove the emit to allow it to change the form
  }
}
