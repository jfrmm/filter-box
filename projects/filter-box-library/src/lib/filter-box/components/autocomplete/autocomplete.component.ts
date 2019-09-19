import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';
import { FilterComponentModel } from '../../models/filter-component.model';

@Component({
  selector: 'asp-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
