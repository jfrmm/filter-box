import { FilterModel } from '../models/filter.model';

export class FilterEvent {
  constructor(public event, public filter: FilterModel) {}
}
