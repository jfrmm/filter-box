import { Component, OnInit, Input } from '@angular/core';
import { DateFilter } from '../../filters/date-filter';
import { FilterHelperService } from '../../filter-helper.service';

@Component({
  selector: 'asp-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  @Input()
  public filter: DateFilter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
