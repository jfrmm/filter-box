import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { FilterEmptyEvent } from '../events/filter-empty-event';
import { FilterEvent } from '../events/filter-event';
import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterElement } from './filter-element';
import { Filter } from './filter/filter';

// implements FilterModel

export class AutocompleteFilter extends Filter {
  get type(): string {
    return 'autocomplete';
  }

  public events: Observable<FilterEvent>;

  public options: FilterOption[];

  public searchFormControl: FormControl;

  constructor(
    paramName: string,
    placeholder: string,
    getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    initialValue: FilterOption = null,
    component: Type<any> = AutocompleteComponent
  ) {
    super(paramName, placeholder, getFilterOptions, initialValue, component);

    const formControl = new FormControl(initialValue);

    this.setEvents(formControl);

    this.searchFormControl = new FormControl();

    this.getFilterOptions().subscribe((options: FilterOption[]) => {
      this.options = options;

      this.internalEvent = new Subject();

      this.elements = new FilterElement(placeholder, formControl, this.filterSearch());
    });
  }

  private filterSearch(): Observable<FilterOption[]> {
    return this.searchFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) =>
        of(
          this.options.filter((filterOption: FilterOption) =>
            filterOption.value.toLowerCase().includes(filterTerm.toLowerCase())
          )
        )
      )
    );
  }

  // TODO: Add to filter?
  public updateFilterOptions(params: FilterParam[]): FilterEvent {
    this.elements.formControl.disable({ emitEvent: false });
    this.getFilterOptions(params).subscribe(options => {
      this.options = options;
      this.elements.formControl.enable({ emitEvent: false });
      this.elements.options = this.filterSearch();
    });

    return new FilterEvent(new FilterEmptyEvent(), this);
  }
}
