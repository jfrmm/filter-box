import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
