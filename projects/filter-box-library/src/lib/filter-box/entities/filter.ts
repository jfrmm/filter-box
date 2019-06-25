import { FilterOption } from '../models/filter-option.model';
import { FilterParam } from '../models/filter-param.model';
import { FilterElement } from './filter-element';

export abstract class Filter {
  private _paramName: string;

  private _type: 'checkbox' | 'default';

  protected _elements: FilterElement[];

  protected _initialOptions: FilterOption[];

  get elements(): FilterElement[] {
    return this._elements;
  }

  set elements(element: FilterElement[]) {
    this._elements = element;
  }

  get initialOptions(): FilterOption[] {
    return this._initialOptions;
  }

  get paramName(): string {
    return this._paramName;
  }

  get param(): FilterParam {
    return this.getFilterParam();
  }

  get type(): 'checkbox' | 'default' {
    return this._type;
  }

  constructor(paramName: string, options: FilterOption[], type: 'checkbox' | 'default') {
    this._paramName = paramName;
    this._initialOptions = options;
    this._type = type;
  }

  protected abstract getFilterParam(): FilterParam;

  protected abstract mapControlsValues(): string;

  public abstract clearAllElements(): void;
}
