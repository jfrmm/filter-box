import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { PizzaModel } from './pizza.model';
import { map } from 'rxjs/operators';
import { PIZZASLIST } from './mock';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor() {}

  public getPizzasList(): Observable<{ elements: PizzaModel[] }> {
    return timer(2000).pipe(map(() => ({ elements: PIZZASLIST })));
  }
}
