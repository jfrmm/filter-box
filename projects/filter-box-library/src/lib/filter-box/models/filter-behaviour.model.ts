import { FilterClearEvent } from '../events/filter-clear-event';
import { FilterDisabledEvent } from '../events/filter-disabled-event';
import { FilterEnabledEvent } from '../events/filter-enabled-event';
import { FilterEvent } from '../events/filter-event';
import { FilterValidValueChangeEvent } from '../events/filter-valid-value-change-event';
import { FilterModel } from './filter.model';

export interface FilterBehaviour {
  callbacks: ((callback?: any) => FilterEvent)[];
  emitters: FilterModel[];
  events: FilterClearEvent[] | FilterValidValueChangeEvent[] | FilterEnabledEvent[] | FilterDisabledEvent[];
}
