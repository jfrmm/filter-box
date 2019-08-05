import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter } from './entities/filter';
import { FilterHelperService } from './filter-helper.service';
import { FilterMediatorService } from './filter-mediator.service';
import { FilterBehaviour } from './models/filter-behaviour.model';

@Component({
  selector: 'asp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  providers: [FilterMediatorService],
})
export class FilterBoxComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions: Subscription;

  @Input()
  public filterBehaviours: FilterBehaviour[];

  @Input()
  public filters: Filter[];

  @Output()
  public index = new EventEmitter();

  constructor(private filterMediator: FilterMediatorService, public filterHelper: FilterHelperService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.subscribeToFilterElementsChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.filterBehaviours) {
      this.filterMediator.setFilterBehaviours(this.filterBehaviours);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private subscribeToFilterElementsChanges(): void {
    this.filters.forEach(filter => this.subscriptions.add(filter.params.subscribe(() => this.index.emit())));
  }

  public onClickClearAllFilters(): void {
    this.filters.forEach((filter: Filter) => filter.clearAllElements(false));

    this.index.emit();
  }

  public onClickClearFilter(event: MouseEvent, filter: Filter): void {
    event.stopImmediatePropagation();

    filter.clearAllElements();
  }
}
