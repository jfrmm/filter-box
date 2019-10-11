import { Component, OnInit } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';

@Component({
  selector: 'asp-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  public filter;

  constructor(public filterHelper: FilterHelperService) { }

  public ngOnInit() {
  }

}
