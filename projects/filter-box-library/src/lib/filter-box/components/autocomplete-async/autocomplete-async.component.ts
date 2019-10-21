import { Component, Input, OnInit } from '@angular/core';
import { FilterComponentModel } from '../../models/filter-component.model';
import { FilterHelperService } from '../../services/filter-helper.service';

@Component({
  selector: 'asp-autocomplete-async',
  templateUrl: './autocomplete-async.component.html',
  styleUrls: ['./autocomplete-async.component.css'],
})
export class AutocompleteAsyncComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  public clearSearch(event: boolean): void {
    if (!event) {
      this.filter.searchFormControl.setValue('');
    }
  }

  public ngOnInit() {}
}
