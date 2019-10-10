import { Injectable } from '@angular/core';
import { FilterOption, FilterParam } from 'filter-box-library';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { PIZZABASES, PIZZASLIST, RATINGS, RESTAURANTS } from './mock';
import { PizzaModel } from './pizza.model';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor() {}

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

  public getPizzasList(params: FilterParam[]): Observable<{ elements: PizzaModel[] }> {
    const filteredData = this.mockServerFilter(PIZZASLIST, params);

    return timer(1000).pipe(map(() => ({ elements: filteredData })));
  }

  public getRatings(): Observable<FilterOption[]> {
    return timer(200).pipe(map(() => RATINGS));
  }

  public getRestaurants(filterTerm?: string): Observable<FilterOption[]> {
    filterTerm = filterTerm ? filterTerm.toLowerCase() : '';

    return timer(1000).pipe(
      map(() => RESTAURANTS.filter((restaurant: FilterOption) => restaurant.value.toLowerCase().includes(filterTerm)))
    );
  }
}
