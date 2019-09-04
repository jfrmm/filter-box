import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatTableModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
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
  ],
  entryComponents: [],
})
export class SharedModule {}
