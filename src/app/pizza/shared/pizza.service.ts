import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaModel } from './pizza.model';
import { PIZZASLIST, PIZZABASES, RESTAURANTS, RATINGS } from './mock';
import { FilterParam, FilterOption } from 'filter-box-library';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor() {}

  public getPizzasList(params: FilterParam[]): Observable<{ elements: PizzaModel[] }> {
    const filteredData = this.mockServerFilter(PIZZASLIST, params);

    return timer(1000).pipe(map(() => ({ elements: filteredData })));
  }

  public getPizzaBases(): Observable<FilterOption[]> {
    return timer(500).pipe(map(() => PIZZABASES));
  }

  public getRestaurants(): Observable<FilterOption[]> {
    return timer(200).pipe(map(() => RESTAURANTS));
  }

  public getRatings(): Observable<FilterOption[]> {
    return timer(200).pipe(map(() => RATINGS));
  }

  /**
   * Simulate the server expected filter process
   */
  private mockServerFilter(data: PizzaModel[], params: FilterParam[]): any[] {
    const pizzaModel = { id: null, name: null, base: null, restaurant: null, rating: null };

    let filteredData: any[] = data;

    params.forEach(param => {
      if (Object.keys(pizzaModel).includes(param.name)) {
        try {
          const checkboxParamValues: string[] = param.value.split(',');

          filteredData = filteredData.filter(elem =>
            checkboxParamValues.some(value => (elem[param.name] ? elem[param.name].id === +value : false))
          );
        } catch (error) {
          filteredData = filteredData.filter(elem => (elem[param.name] ? elem[param.name].id === param.value : false));
        }
      }
    });

    return filteredData;
  }
}
