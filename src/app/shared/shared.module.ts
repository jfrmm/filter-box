import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterBoxModule } from 'filter-box-library';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatTableModule, FlexLayoutModule, FilterBoxModule],
  exports: [CommonModule, MatCardModule, MatTableModule, FlexLayoutModule, FilterBoxModule],
})
export class SharedModule {}
