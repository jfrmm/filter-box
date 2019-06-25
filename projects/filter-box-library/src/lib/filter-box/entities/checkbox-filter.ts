import { FilterOption } from '../models/filter-option.model';
import { Filter } from './filter';
import { FilterElement } from './filter-element';
import { FormControl } from '@angular/forms';
import { FilterParam } from '../models/filter-param.model';

export class CheckboxFilter extends Filter {
  private initialValuesIds: string[] | number[];

  constructor(paramName: string, options: FilterOption[], initialValuesIds: string[] | number[] = []) {
    super(paramName, options, 'checkbox');

    this.initialValuesIds = initialValuesIds;

    this.elements = this.buildFilterElements();
  }

  private buildFilterElements(): FilterElement[] {
    return this._initialOptions.map(
      option => new FilterElement(option.value, new FormControl(this.getOptionDefaultValue(option)))
    );
  }

  private getOptionDefaultValue(option: FilterOption): boolean {
    return this.initialValuesIds.some((id: number | string) => option.id === id);
  }

  protected getFilterParam(): FilterParam {
    const filterParam: FilterParam = {
      name: this.paramName,
      value: this.mapControlsValues(),
    };
    return filterParam;
  }

  private getOptionId(index: number): string {
    return this._initialOptions[index].id.toString();
  }

  protected mapControlsValues(): string {
    const values = this.elements
      .map((element: FilterElement, index) => (element.formControl.value ? this.getOptionId(index) : null))
      .filter(value => value)
      .join(',');

    return values ? values : null;
  }

  public clearAllElements(): void {
    this._elements.forEach(element => element.clear());
  }
}
