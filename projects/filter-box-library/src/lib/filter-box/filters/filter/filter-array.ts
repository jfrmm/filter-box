import { Filter } from './filter';

export class FilterArray extends Array<Filter> {
  private hasDuplicate(): boolean {
    return new Set(this.map(filter => filter.paramName)).size !== this.length;
  }
  public get(paramName: string): Filter {
    return this.find(filter => filter.paramName === paramName);
  }

  public push(...items: Filter[]): number {
    const newArrayLength = super.push(...items);
    if (this.hasDuplicate()) {
      throw new Error('Duplicated paramName');
    }
    return newArrayLength;
  }
}
