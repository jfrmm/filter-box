import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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
