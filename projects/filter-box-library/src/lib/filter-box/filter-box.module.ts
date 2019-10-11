import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteAsyncComponent } from './components/autocomplete-async/autocomplete-async.component';
import { AutocompleteMultipleComponent } from './components/autocomplete-multiple/autocomplete-multiple.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ClearFilterButtonComponent } from './components/clear-filter-button/clear-filter-button.component';
import { DateComponent } from './components/date/date.component';
import { SelectComponent } from './components/select/select.component';
import { FilterAnchorDirective } from './filter-anchor.directive';
import { FilterBoxComponent } from './filter-box.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    FilterBoxComponent,
    CheckboxComponent,
    ClearFilterButtonComponent,
    AutocompleteComponent,
    DateComponent,
    AutocompleteAsyncComponent,
    AutocompleteMultipleComponent,
    SelectComponent,
    FilterAnchorDirective,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [
    FilterBoxComponent,
    CheckboxComponent,
    ClearFilterButtonComponent,
    AutocompleteComponent,
    DateComponent,
    AutocompleteAsyncComponent,
    AutocompleteMultipleComponent,
    SelectComponent,
  ],
  entryComponents: [
    CheckboxComponent,
    AutocompleteComponent,
    DateComponent,
    AutocompleteAsyncComponent,
    AutocompleteMultipleComponent,
    SelectComponent,
  ],
})
export class FilterBoxModule {}
