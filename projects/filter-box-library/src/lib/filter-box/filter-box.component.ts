import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterModel } from './models/filter.model';
import { FilterHelperService } from './filter-helper.service';
import { FilterMediatorService } from './filter-mediator.service';
import { FilterBehaviour } from './models/filter-behaviour.model';

@Component({
  selector: 'asp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  providers: [FilterMediatorService],
})
export class FilterBoxComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  @Input()
  public filterBehaviours: FilterBehaviour[];

  @Input()
  public filters: FilterModel[];

  @Output()
  public index = new EventEmitter();

  constructor(private filterMediatorService: FilterMediatorService, public filterHelper: FilterHelperService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.filterMediatorService.setFilters(this.filters, this.filterBehaviours);

    this.subscriptions.add(this.filterMediatorService.filterChanged.subscribe(() => this.index.emit()));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onClickClearAllFilters(): void {
    this.filters.forEach((filter: FilterModel) => filter.clearFilter());

    this.index.emit();
  }

  public onClickClearFilter(event: MouseEvent, filter: FilterModel): void {
    event.stopImmediatePropagation();

    filter.clearFilter(true);
  }
}
