import { Injectable, OnDestroy } from '@angular/core';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { Subject } from 'rxjs';
import { Filter } from './entities/filter';
import { FilterBoxEvent } from './entities/filter-box-event';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class FilterMediatorService implements OnDestroy {
  private destroy$: Subject<void>;

  constructor() {
    this.destroy$ = new Subject();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private propagateEvent(event: FilterBoxEvent, filterBehaviour: FilterBehaviour) {
    if (filterBehaviour.events.some((behaviourEvent: FilterBoxEvent) => event instanceof behaviourEvent.constructor)) {
      filterBehaviour.callbacks.forEach((callback: (callback?: any) => void) => callback());
    }
  }

  /**
   * Set the FilterBehaviours, previous
   * Behaviours are removed
   */
  public setFilterBehaviours(filterBehaviours: FilterBehaviour[]) {
    this.destroy$.next();

    filterBehaviours.forEach((filterBehaviour: FilterBehaviour) => {
      filterBehaviour.emmitters.forEach((emitter: Filter) => {
        emitter.eventEmitter
          .pipe(takeUntil(this.destroy$))
          .subscribe((event: FilterBoxEvent) => this.propagateEvent(event, filterBehaviour));
      });
    });
  }
}
