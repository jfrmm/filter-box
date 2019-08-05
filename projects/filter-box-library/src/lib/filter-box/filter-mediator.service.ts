import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { Subject } from 'rxjs';
import { Filter } from './filters/filter';
import { FilterEvent } from './events/filter-event';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class FilterMediatorService implements OnDestroy {
  private destroy$: Subject<void>;

  private filterBehaviours: FilterBehaviour[];

  public filterChanged = new EventEmitter();

  constructor() {
    this.destroy$ = new Subject();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private propagateEvent(filter: Filter, event: FilterEvent): void {
    const filterBehaviour: FilterBehaviour = this.filterBehaviours.find((behaviour: FilterBehaviour) =>
      behaviour.emitters.some(
        (emittingFilter: Filter) =>
          emittingFilter === filter &&
          behaviour.events.some((behaviourEvent: FilterEvent) => event instanceof behaviourEvent.constructor)
      )
    );

    if (filterBehaviour) {
      // filterBehaviour.callbacks.forEach((callback: (callback?: any) => void) => callback());
      filterBehaviour.callbacks();
    } else {
      this.filterChanged.emit();
    }
  }

  public setFilters(filters: Filter[], filterBehaviours?: FilterBehaviour[]): void {
    this.filterBehaviours = filterBehaviours;

    filters.forEach(filter =>
      filter.events.pipe(takeUntil(this.destroy$)).subscribe((event: FilterEvent) => this.propagateEvent(filter, event))
    );
  }
}
