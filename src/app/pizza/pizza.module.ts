import { NgModule } from '@angular/core';

import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { SharedModule } from '../shared/shared.module';
import { RandomColorAutocompleteFilterComponent } from '../custom-filters/random-color-autocomplete-filter/random-color-autocomplete-filter.component';
import { SelectFilterComponent } from '../custom-filters/select-filter/select-filter.component';

@NgModule({
  declarations: [PizzaListComponent, RandomColorAutocompleteFilterComponent, SelectFilterComponent],
  imports: [PizzaRoutingModule, SharedModule],
  entryComponents: [RandomColorAutocompleteFilterComponent, SelectFilterComponent],
})
export class PizzaModule {}
