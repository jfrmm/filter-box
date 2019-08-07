import { Filter } from '../filters/filter';

export class FilterEvent {
  constructor(public event, public filter: Filter) {}
}
