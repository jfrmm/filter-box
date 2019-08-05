import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { Subject } from 'rxjs';
import { Filter } from './entities/filter';
import { FilterBoxEvent } from './entities/filter-box-event';
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

  // private propagateEvent(event: FilterBoxEvent, filterBehaviour: FilterBehaviour): void {
  //   if (filterBehaviour.events.some((behaviourEvent: FilterBoxEvent) => event instanceof behaviourEvent.constructor)) {
  //     filterBehaviour.callbacks.forEach((callback: (callback?: any) => void) => callback());
  //   }
  // }

  private propagateEvent(filter: Filter, event: FilterBoxEvent): void {
    if (
      this.filterBehaviours &&
      this.filterBehaviours.some((behaviour: FilterBehaviour) =>
        behaviour.emitters.some(
          (emittingFilter: Filter) =>
            emittingFilter === filter && behaviour.events.some((filterEvent: FilterBoxEvent) => filterEvent === event)
        )
      )
    ) {
      // Execute callback etc
    } else {
      this.filterChanged.emit();
    }
  }

  public setFilters(filters: Filter[], filterBehaviours?: FilterBehaviour[]): void {
    this.filterBehaviours = filterBehaviours;

    filters.forEach(filter =>
      filter.events
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: FilterBoxEvent) => this.propagateEvent(filter, event))
    );
  }
}
