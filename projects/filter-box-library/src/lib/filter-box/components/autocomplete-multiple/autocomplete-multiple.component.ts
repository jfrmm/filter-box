import { Component, Input, OnInit } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';
import { FilterComponentModel } from '../../models/filter-component.model';
import { FilterOption } from '../../models/filter-option.model';

@Component({
  selector: 'asp-autocomplete-multiple',
  templateUrl: './autocomplete-multiple.component.html',
  styleUrls: ['./autocomplete-multiple.component.css'],
})
export class AutocompleteMultipleComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  public clearSearch(event: boolean): void {
    if (!event) {
      this.filter.searchFormControl.setValue('');
    }
  }

  public isAllSelected(): boolean {
    const numSelected = this.filter.selection.selected.length;
    const numRows = this.filter.initialOptions.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    if (this.filter.selection.selected.length === this.filter.initialOptions.length) {
      this.filter.initialOptions.forEach((option: FilterOption) => this.filter.selection.deselect(option));
    } else {
      this.filter.initialOptions.forEach((option: FilterOption) => this.filter.selection.select(option));
    }

    this.filter.elements.formControl.setValue(this.filter.selection.selected);
  }

  public ngOnInit() {}

  public toggleOption(event: MouseEvent, filterOption: FilterOption): void {
    event.stopPropagation();

    this.filter.selection.toggle(filterOption);

    this.filter.elements.formControl.setValue(this.filter.selection.selected);
  }
}
