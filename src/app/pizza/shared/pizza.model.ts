import { FilterOption } from 'filter-box-library';

export interface PizzaModel {
  id?: number;
  name: string;
  base: FilterOption;
  restaurant?: FilterOption;
  price?: number;
  rating: FilterOption;
  ratingDate: string;
}
