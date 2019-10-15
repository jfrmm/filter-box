import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
} from '@angular/material';

import { FilterBoxModule } from 'filter-box-library';
import { FilterBoxConfig } from 'projects/filter-box-library/src/public-api';

// Filter Box default config
const filterBoxConfig: FilterBoxConfig = {
  clearAll: 'simple',
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FilterBoxModule.forRoot(filterBoxConfig),
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FilterBoxModule,
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  entryComponents: [],
})
export class SharedModule {}
