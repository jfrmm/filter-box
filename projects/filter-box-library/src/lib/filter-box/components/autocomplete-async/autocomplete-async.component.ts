import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';
import { FilterComponentModel } from '../../models/filter-component.model';

@Component({
  selector: 'asp-autocomplete-async',
  templateUrl: './autocomplete-async.component.html',
  styleUrls: ['./autocomplete-async.component.css'],
})
export class AutocompleteAsyncComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
