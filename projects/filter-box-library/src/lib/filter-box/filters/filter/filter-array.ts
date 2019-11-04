import { FilterParam } from '../../models/filter-param.model';
import { CheckboxFilter } from '../checkbox-filter/checkbox-filter';
import { Filter } from './filter';

export class FilterArray extends Array<Filter> {
  public get filterParams(): FilterParam[] {
    const checkboxes: CheckboxFilter[] = this.filter(
      filter => filter.type === 'checkbox' && filter.param.value !== null && (filter as CheckboxFilter).groupId !== null
    ) as CheckboxFilter[];

    const mappedCheckboxes: FilterParam[] = this.mapGroupedFilters(this.groupByGroupId(checkboxes));

    const params = this.filter(filter => filter.type !== 'checkbox' || (filter as CheckboxFilter).groupId === null)
      .map(filter => filter.param)
      .filter(filter => filter.value !== null);

    return params.concat(mappedCheckboxes).filter(param => param.value !== null);
  }

  private hasDuplicate(): boolean {
    return new Set(this.map(filter => filter.name)).size !== this.length;
  }

  private mapGroupedFilters(filtersArray): FilterParam[] {
    const params: FilterParam[] = [];

    Object.values(filtersArray).forEach((filters: Filter[]) => {
      const currentFilterParam: FilterParam[] = filters.map((filter: Filter) => ({
        name: filter.paramName,
        value: filter.param.value,
      }));

      const groupedParam = {
        name: currentFilterParam[0].name,
        value: currentFilterParam.map(param => param.value).join(','),
      };

      params.push(groupedParam);
    });

    return params;
  }

  public clearAll(): void {
    this.forEach(filter => filter.clearFilter());
  }

  public get(name: string): Filter {
    return this.find(filter => filter.name === name);
  }

  public groupByGroupId(filters: CheckboxFilter[]) {
    return filters
      .filter(filter => filter.groupId !== null)
      .reduce((objectsByKeyValue, obj) => {
        const value = obj.groupId;
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});
  }

  public push(...items: Filter[]): number {
    const newArrayLength = super.push(...items);
    if (this.hasDuplicate()) {
      throw new Error('Duplicated filter name');
    }
    return newArrayLength;
  }

  public toQueryParam(): { [param: string]: string } {
    return (this.filterParams as any).reduce((previousParam: FilterParam, currentParam: FilterParam) => {
      previousParam = { ...previousParam, [currentParam.name]: currentParam.value };
      return previousParam;
    }, {});
  }
}
