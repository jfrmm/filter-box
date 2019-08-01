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
  ClearEvent,
  ValidValueChangeEvent,
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
        // {
        //   emitters: [this.filters[0]],
        //   events: [new ClearEvent(), new ValidValueChangeEvent()],
        //   callbacks: [() => this.filters[1].clearAllElements()],
        // },
        // {
        //   emitters: [this.filters[1]],
        //   events: [new ValidValueChangeEvent()],
        //   callbacks: [() => this.filters[2].elements[0].formControl.disable()],
        // },
        // {
        //   emitters: [this.filters[1]],
        //   events: [new ClearEvent()],
        //   callbacks: [() => this.filters[2].elements[0].formControl.enable()],
        // },
        // {
        //   emitters: [this.filters[2]],
        //   events: [new ClearEvent()],
        //   callbacks: [() => this.filters[3].elements[0].formControl.disable()],
        // },
        // {
        //   emitters: [this.filters[4]],
        //   events: [new ValidValueChangeEvent()],
        //   callbacks: [() => this.filters[3].elements[0].formControl.enable()],
        // },
      ];
    });
  }

  public index(reset: boolean): void {
    console.log('index');
    this.pizzaService
      .getPizzasList(this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
  }
}
