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

  public getPizzaBases(params?: FilterParam[]): Observable<FilterOption[]> {
    return timer(500).pipe(
      map(() => {
        if (params && params[0].value !== null) {
          return [PIZZABASES[1]];
        }
        return PIZZABASES;
      })
    );
  }

  public getRestaurants(filterTerm?: string): Observable<FilterOption[]> {
    filterTerm = filterTerm ? filterTerm.toLowerCase() : '';

    return timer(1000).pipe(
      map(() => RESTAURANTS.filter((restaurant: FilterOption) => restaurant.value.toLowerCase().includes(filterTerm)))
    );
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
      } else if (param.name === 'from') {
        filteredData = filteredData.filter(elem => new Date(elem.ratingDate).toISOString() >= param.value);
      } else if (param.name === 'to') {
        filteredData = filteredData.filter(elem => new Date(elem.ratingDate).toISOString() <= param.value);
      }
    });

    return filteredData;
  }
}
