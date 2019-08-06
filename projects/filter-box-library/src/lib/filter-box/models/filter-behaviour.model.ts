import { Filter } from '../filters/filter';
import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEvent } from '../events/filter-event';

export interface FilterBehaviour {
  emitters: Filter[];
  events: FilterClearEvent[] | FilterValidValueChangeEvent[] | FilterEnabledEvent[] | FilterDisabledEvent[];
  callbacks: ((callback?: any) => FilterEvent)[];
  // callbacks: ((callback?: any) => void);
}
