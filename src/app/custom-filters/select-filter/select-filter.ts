import { AutocompleteFilter, FilterOption } from 'filter-box-library';
import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';
import { SelectFilterComponent } from './select-filter.component';

export class SelectFilter extends AutocompleteFilter {
  public component: Type<any> = SelectFilterComponent;

  get type(): string {
    return 'select';
  }

  protected filterOptions(): Observable<FilterOption[]> {
    return of(this.initialOptions);
  }
}
