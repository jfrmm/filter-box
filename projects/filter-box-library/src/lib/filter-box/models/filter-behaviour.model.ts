import { Filter } from '../entities/filter';
import { FilterBoxEvent } from '../entities/filter-box-event';

export interface FilterBehaviour {
  emitters: Filter[];
  events: FilterBoxEvent[];
  callbacks: [(callback?: any) => void];
}


