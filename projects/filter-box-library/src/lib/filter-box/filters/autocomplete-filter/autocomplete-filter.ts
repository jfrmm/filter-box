import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { FilterEmptyEvent } from '../../events/filter-empty-event';
import { FilterEvent } from '../../events/filter-event';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { Filter } from '../filter/filter';

export class AutocompleteFilter extends Filter {
  get type(): string {
    return 'autocomplete';
  }

  public filteredOptions: Observable<FilterOption[]>;

  public options: FilterOption[];

  public searchFormControl: FormControl = new FormControl();

  constructor(
    paramName: string,
    placeholder: string,
    getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    initialValue: FilterOption | FilterOption[] = null,
    component: Type<any> = AutocompleteComponent
  ) {
    super(paramName, placeholder, getFilterOptions, initialValue, component);

    this.getFilterOptions().subscribe((options: FilterOption[]) => {
      this.options = options;

      this.filteredOptions = this.filterSearch();
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
    this.formControl.disable({ emitEvent: false });
    this.getFilterOptions(params).subscribe(options => {
      this.options = options;
      this.formControl.enable({ emitEvent: false });
      this.filteredOptions = this.filterSearch();
    });

    return new FilterEmptyEvent(this);
  }
}
