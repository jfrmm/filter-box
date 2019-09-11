import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';
import { FilterComponentModel } from '../../models/filter-component.model';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterOption } from '../../models/filter-option.model';
import { FormControl } from '@angular/forms';
import { startWith, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'asp-autocomplete-multiple',
  templateUrl: './autocomplete-multiple.component.html',
  styleUrls: ['./autocomplete-multiple.component.css'],
})
export class AutocompleteMultipleComponent implements OnInit, FilterComponentModel {
  @Input()
  public filter;

  public searchFormControl: FormControl;

  // Necessary to easily set options as checked when autocompleting
  // public selectFormControl: FormControl;

  public selection: SelectionModel<FilterOption>;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {
    this.searchFormControl = new FormControl();

    // this.selectFormControl = new FormControl(this.filter.elements.formControl.value);

    const allowMultiselect = true;

    const initialSelection = [];

    this.selection = new SelectionModel<FilterOption>(allowMultiselect, initialSelection);

    this.filter.elements.options = this.filterSearch();

    // this.filter.elements.formControl.valueChanges.subscribe(value => {
    //   console.log(value);
    //   if (!value) {
    //     this.selectFormControl.setValue('');
    //     this.selection.clear();
    //   }
    // });
  }

  private filterSearch(): Observable<FilterOption[]> {
    return this.searchFormControl.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((filterTerm: string) =>
        of(
          this.filter.initialOptions.filter((filterOption: FilterOption) =>
            filterOption.value.toLowerCase().includes(filterTerm.toLowerCase())
          )
        )
      )
    );
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.filter.initialOptions.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    if (this.selection.selected.length === this.filter.initialOptions.length) {
      this.filter.initialOptions.forEach((option: FilterOption) => this.selection.deselect(option));
    } else {
      this.filter.initialOptions.forEach((option: FilterOption) => this.selection.select(option));
    }

    this.filter.elements.formControl.setValue(this.selection.selected);
    // this.selectFormControl.setValue(this.selection.selected);
  }

  public toggleOption(event: MouseEvent, filterOption: FilterOption): void {
    event.stopPropagation();

    this.selection.toggle(filterOption);

    this.filter.elements.formControl.setValue(this.selection.selected);
    // this.selectFormControl.setValue(this.selection.selected);
  }
}
