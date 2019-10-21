import { FilterOption } from 'filter-box-library';

export interface PizzaModel {
  base: FilterOption;
  id?: number;
  name: string;
  price?: number;
  rating: FilterOption;
  ratingDate: string;
  restaurant?: FilterOption;
}
