import { FilterOption } from 'filter-box-library';
import { PizzaModel } from './pizza.model';

export const PIZZABASES: FilterOption[] = [
  { id: 1, value: 'Tomato' },
  { id: 2, value: 'Cheese' },
  { id: 3, value: 'Seafood' },
  { id: 4, value: 'Onions' },
];

export const RESTAURANTS: FilterOption[] = [
  { id: 1, value: 'Fat Chef' },
  { id: 2, value: 'Little Mermaid' },
  { id: 3, value: 'The Swiss' },
];

export const RATINGS: FilterOption[] = [{ id: 1, value: 'GOOD' }, { id: 2, value: 'MEDIUM' }, { id: 3, value: 'BAD' }];

export const PIZZASLIST: PizzaModel[] = [
  { id: 1, name: 'Margherita', base: PIZZABASES[0], rating: RATINGS[1], ratingDate: '05-19-2019' },
  {
    id: 2,
    name: 'Marinara',
    base: PIZZABASES[1],
    restaurant: RESTAURANTS[0],
    rating: RATINGS[0],
    ratingDate: '01-22-2019',
  },
  {
    id: 3,
    name: 'Frutti di Mare',
    base: PIZZABASES[2],
    restaurant: RESTAURANTS[1],
    rating: RATINGS[1],
    ratingDate: '11-29-2018',
  },
  { id: 4, name: 'Carbonara', base: PIZZABASES[0], rating: RATINGS[2], ratingDate: '04-09-2018' },
  {
    id: 5,
    name: 'Quattro Formaggi',
    base: PIZZABASES[1],
    restaurant: RESTAURANTS[2],
    rating: RATINGS[0],
    ratingDate: '06-11-2019',
  },
  {
    id: 6,
    name: 'Napoli',
    base: PIZZABASES[0],
    restaurant: RESTAURANTS[0],
    rating: RATINGS[2],
    ratingDate: '07-29-2019',
  },
  { id: 7, name: 'Pugliese', base: PIZZABASES[3], rating: RATINGS[0], ratingDate: '06-03-2019' },
];

export const FOODIETYPE: FilterOption[] = [
  { id: 1, value: 'Instagrammer' },
  { id: 2, value: 'Youtuber' },
  { id: 3, value: 'Zomatoer' },
];
