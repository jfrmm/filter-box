import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatTableModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
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
