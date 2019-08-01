import { FilterBehaviour } from '../models/filter-behaviour.model';
import { FilterBoxEvent } from './filter-box-event';
import { Filter } from './filter';
import { Subscription } from 'rxjs';

export class Mediator {
  private subscription: Subscription;

  constructor(filterBehaviours: FilterBehaviour[]) {
    this.subscription = new Subscription();

    filterBehaviours.forEach((filterBehaviour: FilterBehaviour) => {
      filterBehaviour.emmitters.forEach((emitter: Filter) => {
        this.subscription.add(
          emitter.eventEmitter.subscribe((event: FilterBoxEvent) => this.propagateEvent(event, filterBehaviour))
        );
      });
    });
  }
  // retornar a subscrição e o component que trate dela?

  private propagateEvent(event: FilterBoxEvent, filterBehaviour: FilterBehaviour) {
    if (filterBehaviour.events.some((behaviourEvent: FilterBoxEvent) => event instanceof behaviourEvent.constructor)) {
      filterBehaviour.callbacks.forEach((callback: (callback?: any) => void) => callback());
    }
  }
}
