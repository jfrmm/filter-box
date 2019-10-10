import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilterOption } from '../models/filter-option.model';

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
