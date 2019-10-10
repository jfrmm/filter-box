import { Component, Input, OnInit } from '@angular/core';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'asp-clear-filter-button',
  templateUrl: './clear-filter-button.component.html',
  styleUrls: ['./clear-filter-button.component.css']
})
export class ClearFilterButtonComponent implements OnInit {
  @Input()
  public disabled = false;

  @Input()
  public filter: FilterModel;

  constructor() { }

  public ngOnInit() {}

  public onClickClearFilter(event: MouseEvent): void {
    event.stopImmediatePropagation();

    this.filter.clearFilter(true);
  }

}
