import { Component, Input, OnInit } from '@angular/core';
import { FilterComponentModel } from '../../models/filter-component.model';
import { FilterHelperService } from '../../services/filter-helper.service';

@Component({
  selector: 'asp-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  public ngOnInit() {}
}
