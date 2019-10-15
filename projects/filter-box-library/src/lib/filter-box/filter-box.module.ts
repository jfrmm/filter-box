import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteAsyncComponent } from './components/autocomplete-async/autocomplete-async.component';
import { AutocompleteMultipleComponent } from './components/autocomplete-multiple/autocomplete-multiple.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ClearFilterButtonComponent } from './components/clear-filter-button/clear-filter-button.component';
import { DateComponent } from './components/date/date.component';
import { FilterAnchorDirective } from './filter-anchor.directive';
import { FilterBoxComponent } from './filter-box.component';
import { MaterialModule } from './material.module';
import { FilterBoxConfig } from './models/filter-box-config.model';
import { FilterBoxConfigService } from './services/filter-box-config.service';

@NgModule({
  declarations: [
    FilterBoxComponent,
    CheckboxComponent,
    ClearFilterButtonComponent,
    AutocompleteComponent,
    DateComponent,
    AutocompleteAsyncComponent,
    AutocompleteMultipleComponent,
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
  ],
  entryComponents: [
    CheckboxComponent,
    AutocompleteComponent,
    DateComponent,
    AutocompleteAsyncComponent,
    AutocompleteMultipleComponent,
  ],
})
export class FilterBoxModule {
  public static forRoot(config?: FilterBoxConfig): ModuleWithProviders {
    return {
      ngModule: FilterBoxModule,
      providers: [
        FilterBoxComponent,
        {
          provide: FilterBoxConfigService,
          useValue: config,
        },
      ],
    };
  }
}
