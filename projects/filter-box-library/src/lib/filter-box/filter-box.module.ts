import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBoxComponent } from './filter-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ClearFilterButtonComponent } from './components/clear-filter-button/clear-filter-button.component';
import { DateComponent } from './components/date/date.component';
import { BaseFilterComponent } from './components/base-filter/base-filter.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    FilterBoxComponent,
    BaseFilterComponent,
    CheckboxComponent,
    ClearFilterButtonComponent,
    AutocompleteComponent,
    DateComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [FilterBoxComponent],
})
export class FilterBoxModule {}
