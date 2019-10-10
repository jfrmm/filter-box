import { Component, OnInit } from '@angular/core';
import { FilterComponentModel, FilterHelperService } from 'filter-box-library';

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.css'],
})
export class SelectFilterComponent implements OnInit, FilterComponentModel {
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  public ngOnInit() {}
}
