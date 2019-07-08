import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin, Subscription } from 'rxjs';
import {
  Filter,
  AutocompleteFilter,
  FilterParam,
  CheckboxFilter,
  AutocompleteAsyncFilter,
  DateFilter,
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

  private subscription: Subscription = new Subscription();

  public displayedColumns: string[];

  public dataSource: GenericDataSource;

  public filters: Filter[];

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
        new DateFilter('from', 'From', '05/05/2019'),
        new CheckboxFilter('rating', ratings)
      );
    });
  }

  public index(reset: boolean): void {
    console.log(this.params);
    this.pizzaService
      .getPizzasList(this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
  }
}
