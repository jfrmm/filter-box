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

  private propagateEvent(event: FilterEvent): void {
    this.findAndExecuteBehaviours(event);
    this.filterChanged.emit();
  }

  public findAndExecuteBehaviours(event: FilterEvent) {
    const behaviours = this.filterBehaviours.filter(
      behaviour =>
        behaviour.emitters.some(emitter => event.filter === emitter) &&
        behaviour.events.some(behaviourEvent => behaviourEvent instanceof event.event.constructor)
    );

    behaviours.forEach(behaviour => {
      behaviour.callbacks.forEach(callback => {
        this.findAndExecuteBehaviours(callback());
      });
    });
  }
  public setFilters(filters: Filter[], filterBehaviours?: FilterBehaviour[]): void {
    this.filterBehaviours = filterBehaviours;

    filters.forEach(filter =>
      filter.events.pipe(takeUntil(this.destroy$)).subscribe((event: FilterEvent) => this.propagateEvent(event))
    );
  }
}
