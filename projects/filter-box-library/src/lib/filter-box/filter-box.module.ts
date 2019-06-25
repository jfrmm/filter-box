import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBoxComponent } from './filter-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FilterBoxComponent],
  imports: [CommonModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
})
export class FilterBoxModule {}
