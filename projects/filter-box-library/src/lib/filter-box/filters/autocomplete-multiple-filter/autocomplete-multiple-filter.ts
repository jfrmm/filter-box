import { SelectionModel } from '@angular/cdk/collections';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteMultipleComponent } from '../../components/autocomplete-multiple/autocomplete-multiple.component';
import { FilterClearEvent } from '../../events/filter-clear-event';
import { FilterEmptyEvent } from '../../events/filter-empty-event';
import { FilterEvent } from '../../events/filter-event';
import { FilterOption } from '../../models/filter-option.model';
import { FilterParam } from '../../models/filter-param.model';
import { AutocompleteFilter } from '../autocomplete-filter/autocomplete-filter';

export class AutocompleteMultipleFilter extends AutocompleteFilter {
  get type(): string {
    return 'autocomplete-multiple';
  }

  public selection: SelectionModel<FilterOption> = new SelectionModel(true);

  constructor(
    name: string,
    paramName: string,
    placeholder: string,
    getFilterOptions: (params?: FilterParam[]) => Observable<FilterOption[]>,
    public initialValue: FilterOption[] = null,
    component: Type<any> = AutocompleteMultipleComponent
  ) {
    super(name, paramName, placeholder, getFilterOptions, initialValue, component);
  }

  protected getOptions(): void {
    this.getFilterOptions().subscribe((options: FilterOption[]) => {
      this.options = options;

      this.filteredOptions = this.filterSearch();

      this.selection = new SelectionModel<FilterOption>(
        true,
        this.initialValue ? this.options.filter(option => this.initialValue.find(o => o.id === option.id)) : null
      );

      this.unsetIsRequesting();
    });
  }

  protected mapControlsValues(): string {
    const formValue: FilterOption[] = this.formControl.value;

    return formValue ? formValue.map((option: FilterOption) => option.id.toString()).join(',') : null;
  }

  public clearFilter(emit: boolean = false): FilterEvent {
    this.formControl.setValue('', { emitEvent: emit });
    this.selection.clear();

    if (emit) {
      return new FilterEmptyEvent(this);
    }

    return new FilterClearEvent(this);
  }
}
