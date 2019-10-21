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
import { filterBoxConfiguration } from '../configs/filter-box.configuration';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    /**
     * Add your modified filterBoxConfiguration here,
     * to override the default config
     */
    FilterBoxModule.forRoot(),
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
