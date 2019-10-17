import { FilterParam } from '../../models/filter-param.model';
import { CheckboxFilter } from '../checkbox-filter/checkbox-filter';
import { Filter } from './filter';

export class FilterArray extends Array<Filter> {
  public get filterParams(): FilterParam[] {
    const checkboxes: CheckboxFilter[] = this.filter(filter => filter.type === 'checkbox') as CheckboxFilter[];

    console.log(this.groupByGroupId(checkboxes));

    const params = this.map(filter => filter.param).filter(filter => filter.value !== null);

    return params;
  }
  private hasDuplicate(): boolean {
    return new Set(this.map(filter => filter.paramName)).size !== this.length;
  }
  public get(paramName: string): Filter {
    return this.find(filter => filter.paramName === paramName);
  }

  public groupByGroupId(array: CheckboxFilter[]): Filter[] {
    return array.reduce(
      (objectsByKeyValue, obj) => {
        const value = obj.groupId;
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      },
      {} as Filter[]
    );
  }

  public push(...items: Filter[]): number {
    const newArrayLength = super.push(...items);
    if (this.hasDuplicate()) {
      throw new Error('Duplicated paramName');
    }
    return newArrayLength;
  }
}
