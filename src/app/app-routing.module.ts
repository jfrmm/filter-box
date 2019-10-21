import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pizzas', loadChildren: () => import('./pizza/pizza.module').then(mod => mod.PizzaModule) },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pizzas',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
