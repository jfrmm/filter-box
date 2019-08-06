import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';
import {
  Filter,
  AutocompleteFilter,
  FilterParam,
  CheckboxFilter,
  AutocompleteAsyncFilter,
  DateFilter,
  FilterBehaviour,
  FilterClearEvent,
  FilterValidValueChangeEvent,
} from 'filter-box-library';
import { GenericDataSource } from 'src/app/shared/generic.datasource';
import { PizzaService } from '../shared/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  private destroy$ = new Subject();

  public displayedColumns: string[];

  public dataSource: GenericDataSource;

  public filters: Filter[];

  public filterBehaviours: FilterBehaviour[];

  get params(): FilterParam[] {
    return this.filters.map(filter => filter.param).filter(filter => filter.value !== null);
  }

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.filters = [];
    this.dataSource = new GenericDataSource();
    this.displayedColumns = ['id', 'name', 'base', 'restaurant', 'price', 'rating', 'ratingDate'];

    this.loadFilterBoxFilters();
    this.index(true);
  }

  private loadFilterBoxFilters(): void {
    forkJoin([this.pizzaService.getPizzaBases(), this.pizzaService.getRatings()]).subscribe(([pizzaBases, ratings]) => {
      this.filters.push(
        new AutocompleteFilter('base', 'Base', pizzaBases),
        new AutocompleteAsyncFilter('restaurant', 'Restaurant', this.pizzaService.getRestaurants),
        new DateFilter('from', 'From'),
        new DateFilter('to', 'To'),
        new CheckboxFilter('rating', ratings)
      );

      this.filterBehaviours = [
        {
          emitters: [this.filters[0]],
          events: [new FilterClearEvent(), new FilterValidValueChangeEvent()],
          callbacks: [() => this.filters[1].clearFilter(false), () => this.filters[2].clearFilter(false)],
        },
        {
          emitters: [this.filters[1]],
          events: [new FilterValidValueChangeEvent()],
          callbacks: [
            () => this.filters[2].disableFilter(),
            () => this.filters[4].disableFilter(),
            () => this.filters[4].enableFilter(0),
            () => this.filters[4].setValue(true, 0),
          ],
        },
        {
          emitters: [this.filters[1]],
          events: [new FilterClearEvent()],
          callbacks: [() => this.filters[2].enableFilter()],
        },
        {
          emitters: [this.filters[2]],
          events: [new FilterClearEvent()],
          callbacks: [() => this.filters[3].disableFilter(), () => this.filters[4].enableFilter()],
        },
        {
          emitters: [this.filters[3]],
          events: [new FilterClearEvent()],
          callbacks: [() => this.filters[0].setValue({ id: 1, value: 'Tomato' })],
        },
      ];
    });
  }
  count = 0;
  public index(reset: boolean): void {
    console.log('index', this.count++);
    this.pizzaService
      .getPizzasList(this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
  }
}
