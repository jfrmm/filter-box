import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { Subject } from 'rxjs';
import { FilterModel } from './models/filter.model';
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

  private executeBehaviours(behaviours: FilterBehaviour[]): void {
    behaviours.forEach(behaviour => {
      behaviour.callbacks.forEach(callback => {
        this.findAndExecuteBehaviours(callback());
      });
    });
  }

  private findAndExecuteBehaviours(event: FilterEvent): void {
    const behaviours: FilterBehaviour[] = this.findBehaviours(event);

    this.executeBehaviours(behaviours);
  }

  private findBehaviours(event: FilterEvent): FilterBehaviour[] {
    return this.filterBehaviours.filter(
      behaviour =>
        behaviour.emitters.some(emitter => event.filter === emitter) &&
        behaviour.events.some(behaviourEvent => behaviourEvent instanceof event.event.constructor)
    );
  }

  private propagateEvent(event: FilterEvent): void {
    if (this.filterBehaviours && this.filterBehaviours.length) {
      this.findAndExecuteBehaviours(event);
    }
    this.filterChanged.emit();
  }

  /**
   * Will complete the previous behaviours
   */
  public setFilters(filters: FilterModel[], filterBehaviours?: FilterBehaviour[]): void {
    this.destroy$.next();

    this.filterBehaviours = filterBehaviours;

    filters.forEach(filter =>
      filter.events.pipe(takeUntil(this.destroy$)).subscribe((event: FilterEvent) => this.propagateEvent(event))
    );
  }
}
