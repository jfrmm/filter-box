import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterEvent } from './events/filter-event';
import { Filter } from './filters/filter/filter';
import { FilterBehaviour } from './models/filter-behaviour.model';

@Injectable()
export class FilterMediatorService implements OnDestroy {
  private readonly destroy$: Subject<void>;

  private filterBehaviours: FilterBehaviour[];

  public filterChanged = new EventEmitter();

  constructor() {
    this.destroy$ = new Subject();
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
        behaviour.events.some(behaviourEvent => behaviourEvent instanceof event.constructor)
    );
  }

  private propagateEvent(event: FilterEvent): void {
    if (this.filterBehaviours && this.filterBehaviours.length) {
      this.findAndExecuteBehaviours(event);
    }
    this.filterChanged.emit();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Will complete the previous behaviours
   */
  public setFilters(filters: Filter[], filterBehaviours?: FilterBehaviour[]): void {
    this.destroy$.next();

    this.filterBehaviours = filterBehaviours;

    filters.forEach(filter =>
      filter.events.pipe(takeUntil(this.destroy$)).subscribe((event: FilterEvent) => this.propagateEvent(event))
    );
  }
}
