import { Component, Input, OnInit } from '@angular/core';
import { FilterComponentModel } from '../../models/filter-component.model';
import { FilterHelperService } from '../../services/filter-helper.service';

@Component({
  selector: 'asp-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  public ngOnInit() {}
}
