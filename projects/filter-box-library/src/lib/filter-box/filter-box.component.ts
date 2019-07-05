import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Filter } from './entities/filter';
import { FilterElement } from './entities/filter-element';
import { FilterHelperService } from './filter-helper.service';

@Component({
  selector: 'asp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
})
export class FilterBoxComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  @Input()
  public filters: Filter[];

  @Output()
  public index = new EventEmitter();

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.subscribeToFilterElementsChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private subscribeToFilterElementsChanges(): void {
    this.filters.forEach(filterElement =>
      filterElement.elements.forEach(element => {
        this.subscriptions.add(
          element.formControl.valueChanges.pipe(filter(value => value === '')).subscribe(() => this.index.emit())
        );
      })
    );
  }

  public onClickClearAllFilters(): void {
    this.filters.forEach((f: Filter) => f.clearAllElements());

    this.index.emit();
  }

  public onClickClearFilter(event: MouseEvent, element: FilterElement): void {
    event.stopImmediatePropagation();

    element.clear();

    this.index.emit();
  }
}
