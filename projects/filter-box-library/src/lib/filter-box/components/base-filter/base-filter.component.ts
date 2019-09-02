import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';
import { FilterModel } from '../../models/filter.model';

@Component({
  selector: 'asp-base-filter',
  templateUrl: './base-filter.component.html',
  styleUrls: ['./base-filter.component.css']
})
export class BaseFilterComponent implements OnInit {
  @Input()
  public filter: FilterModel;

  constructor(public filterHelper: FilterHelperService) { }

  ngOnInit() {
  }

}
