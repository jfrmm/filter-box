import { NgModule } from '@angular/core';

import { PizzaRoutingModule } from './pizza-routing.module';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PizzaListComponent],
  imports: [
    PizzaRoutingModule,
    SharedModule,
  ]
})
export class PizzaModule { }
