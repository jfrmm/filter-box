import { Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { AutocompleteAsyncComponent } from '../../components/autocomplete-async/autocomplete-async.component';
import { FilterOption } from '../../models/filter-option.model';
import { GenericFilter } from '../generic-filter/generic-filter';

export class AutocompleteAsyncFilter extends GenericFilter {
  get type(): string {
    return 'autocomplete-async';
  }

  public filteredOptions: Observable<FilterOption[]>;

  public searchFormControl: FormControl = new FormControl();

  constructor(
    paramName: string,
    placeholder: string,
    getFilterOptions: (filterTerm?: string) => Observable<FilterOption[]>,
    initialValue: FilterOption = null,
    component: Type<any> = AutocompleteAsyncComponent
  ) {
    super(paramName, placeholder, getFilterOptions, initialValue, component);

    this.filteredOptions = this.filterSearch();
  }

  private filterSearch(): Observable<FilterOption[]> {
    return this.searchFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) => this.getFilterOptions(filterTerm))
    );
  }
}
