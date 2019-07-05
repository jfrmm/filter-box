import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../shared/pizza.service';
import { Subject, forkJoin, Observable, Subscription } from 'rxjs';
import { Filter, FilterOption, AutocompleteFilter, FilterParam, CheckboxFilter } from 'filter-box-library';
import { GenericDataSource } from 'src/app/shared/generic.datasource';
import { takeUntil } from 'rxjs/operators';

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
    this.displayedColumns = ['id', 'name', 'base', 'restaurant', 'price', 'rating'];

    this.loadFilterBoxFilters();
    this.index(true);
  }

  private getPizzaBasesOptions(): Observable<FilterOption[]> {
    return this.pizzaService.getPizzaBases();
  }

  private getRestaurantOptions(): Observable<FilterOption[]> {
    return this.pizzaService.getRestaurants();
  }

  private getRatingsOptions(): Observable<FilterOption[]> {
    return this.pizzaService.getRatings();
  }

  private loadFilterBoxFilters(): void {
    forkJoin([this.getPizzaBasesOptions(), this.getRestaurantOptions(), this.getRatingsOptions()]).subscribe(
      ([pizzaBases, restaurants, ratings]) => {
        this.filters.push(
          new AutocompleteFilter('base', 'Base', pizzaBases),
          new AutocompleteFilter('restaurant', 'Restaurant', restaurants),
          new CheckboxFilter('rating', ratings)
        );
      }
    );
  }

  public index(reset: boolean): void {
    this.pizzaService
      .getPizzasList(this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
  }
}
