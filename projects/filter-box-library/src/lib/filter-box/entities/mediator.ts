import { FilterBehaviour } from '../models/filter-behaviour.model';
import { FilterBoxEvent } from './filter-box-event';
import { Filter } from './filter';

export class Mediator {
  constructor(filterBehaviours: FilterBehaviour[]) {
    filterBehaviours.forEach((behaviour: FilterBehaviour) => {
      behaviour.emmitters.forEach((emitter: Filter) => {
        emitter.eventEmitter.subscribe((event: FilterBoxEvent) => this.propagateEvent(event, behaviour));
      });
    });
  }

  private propagateEvent(event: FilterBoxEvent, behaviour: FilterBehaviour) {
    console.log(event, behaviour);
    if (behaviour.events.some((behaviourEvent: FilterBoxEvent) => event instanceof behaviourEvent.constructor)) {
      behaviour.callbacks.forEach(callback => callback());
    }
  }
}
