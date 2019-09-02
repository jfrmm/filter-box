import { Component } from '@angular/core';
import { BaseFilterComponent } from '../base-filter/base-filter.component';

@Component({
  selector: 'asp-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent extends BaseFilterComponent {}
