import { FormControl } from '@angular/forms';
import { FilterOption } from '../models/filter-option.model';
import { Observable } from 'rxjs';

export class FilterElement {
  private _formControl: FormControl;

  private _placeholder: string;

  private _options: Observable<FilterOption[]>;

  get formControl(): FormControl {
    return this._formControl;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  get options(): Observable<FilterOption[]> {
    return this._options;
  }

  constructor(placeholder: string, formControl: FormControl, options?: Observable<FilterOption[]>) {
    this._placeholder = placeholder;
    this._formControl = formControl;
    this._options = options;
  }

  public clear(): void {
    this._formControl.setValue(null);
  }
}
