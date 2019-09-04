import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';

@Component({
  selector: 'asp-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
