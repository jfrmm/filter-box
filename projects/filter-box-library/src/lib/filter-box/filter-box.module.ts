import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBoxComponent } from './filter-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ClearFilterButtonComponent } from './components/clear-filter-button/clear-filter-button.component';
import { DateComponent } from './components/date/date.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AutocompleteAsyncComponent } from './components/autocomplete-async/autocomplete-async.component';

@NgModule({
  declarations: [
    FilterBoxComponent,
    CheckboxComponent,
    ClearFilterButtonComponent,
    AutocompleteComponent,
    DateComponent,
    AutocompleteAsyncComponent
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [FilterBoxComponent],
})
export class FilterBoxModule {}
