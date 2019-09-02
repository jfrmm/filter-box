import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';
import { AutocompleteFilter } from '../../filters/autocomplete-filter';

@Component({
  selector: 'asp-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Input()
  public filter: AutocompleteFilter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
