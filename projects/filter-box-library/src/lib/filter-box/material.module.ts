import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
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
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule],
})
export class MaterialModule {}
