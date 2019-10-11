import { Injectable } from '@angular/core';
import { FilterOption } from 'dist/filter-box-library/public-api';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { FOODIETYPE } from './mock';

@Injectable({
  providedIn: 'root',
})
export class FoodieTypeService {
  constructor() {}

  public getFoodieTypes(): Observable<FilterOption[]> {
    return timer(200).pipe(map(() => FOODIETYPE));
  }
}
