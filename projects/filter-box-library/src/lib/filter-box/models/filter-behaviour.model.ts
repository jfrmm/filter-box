import { Filter } from '../filters/filter';
import { FilterEvent } from '../events/filter-event';

export interface FilterBehaviour {
  emitters: Filter[];
  events: FilterEvent[];
  callbacks: [(callback?: any) => void];
}


