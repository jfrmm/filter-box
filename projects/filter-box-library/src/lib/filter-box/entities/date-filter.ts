import { Filter } from './filter';
import { FilterElement } from './filter-element';
import { FilterParam } from '../models/filter-param.model';
import { FormControl } from '@angular/forms';

export class DateFilter implements Filter {
  private get filterElement(): FilterElement {
    return this.elements[0];
  }

  public elements: FilterElement[];
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

  // TODO: Should we pass the date output format as an argument
  constructor(public paramName: string, public placeholder: string, public initialValue?: string) {
    const initialDate: string = initialValue ? new Date(initialValue).toISOString() : null;

    const formControl = new FormControl(initialDate);

    this.elements = [new FilterElement(placeholder, formControl)];
  }

  private mapControlsValues(): string {
    return this.filterElement.formControl.value ? (this.filterElement.formControl.value as Date).toISOString() : null;
  }

  public clearAllElements(): void {
    this.filterElement.clear();
  }
}
