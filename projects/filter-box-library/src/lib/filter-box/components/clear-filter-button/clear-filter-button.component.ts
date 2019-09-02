import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit() {
    // TODO: Throw error if filter is undefined?
  }

  public onClickClearFilter(event: MouseEvent, filter: FilterModel): void {
    event.stopImmediatePropagation();

    filter.clearFilter(true);
  }

}
