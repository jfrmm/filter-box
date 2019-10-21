import { Filter } from '../filters/filter/filter';

export abstract class FilterEvent {
  constructor(public filter?: Filter) {}
}
