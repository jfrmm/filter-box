import { FormControl } from '@angular/forms';
import { FilterOption } from '../models/filter-option.model';
import { Observable } from 'rxjs';

export class FilterElement {
  constructor(
    public placeholder: string,
    public formControl: FormControl,
    public options?: Observable<FilterOption[]>
  ) {}

  public clear(emit: boolean): void {
    this.formControl.setValue('', { emitEvent: emit });
  }
}
