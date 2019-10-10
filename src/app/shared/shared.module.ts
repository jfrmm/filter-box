import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import { FilterBoxModule } from 'filter-box-library';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    FilterBoxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    FilterBoxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule
  ],
  entryComponents: [],
})
export class SharedModule {}
