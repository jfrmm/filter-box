import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';

const routes: Routes = [
  {
    path: '',
    component: PizzaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PizzaRoutingModule {}
