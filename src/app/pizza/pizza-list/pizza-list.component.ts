import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AutocompleteAsyncFilter,
  AutocompleteFilter,
  AutocompleteMultipleFilter,
  CheckboxFilter,
  DateFilter,
  FilterBehaviour,
  FilterClearEvent,
  FilterParam,
  FilterValidValueChangeEvent,
  SelectFilter,
} from 'filter-box-library';

import { FilterBoxConfig, FilterOption } from 'filter-box-library';

import { FilterArray } from 'filter-box-library';
import { GenericDataSource } from 'src/app/shared/generic.datasource';
import { FoodieTypeService } from '../shared/foodie-type.service';
import { PizzaService } from '../shared/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  get filterParams(): FilterParam[] {
    return this.filters.map(filter => filter.param).filter(filter => filter.value !== null);
  }

  private readonly destroy$ = new Subject();

  private readonly queryParams: FilterParam[] = [];

  public dataSource: GenericDataSource;

  public displayedColumns: string[];

  public filterBehaviours: FilterBehaviour[];

  /**
   * Override the default Filter Box config with input data binding.
   * Add this data bind [filterConfig]="filterConfig", in <asp-filter-box>
   */
  public filterConfig: FilterBoxConfig = {
    buttons: {
      clearAll: 'full',
    },
  };

  public filters = new FilterArray();

  public foodieTypes: FilterOption[];

  public indexCount = 0;

  public selectedFoodieType: FilterOption;

  constructor(private readonly pizzaService: PizzaService, private readonly foodieTypeService: FoodieTypeService) {}

  private loadFilterBoxFilters(): void {
    this.filters.push(
      new AutocompleteFilter('base', 'base', 'Base', () => this.pizzaService.getPizzaBases(), {
        id: 1,
        value: 'Tomato',
      }),
      new AutocompleteAsyncFilter('restaurant', 'restaurant', 'Restaurant', () => this.pizzaService.getRestaurants()),
      new DateFilter('from', 'from', 'From'),
      new SelectFilter('select', 'select', 'select', () => this.pizzaService.getPizzaBases()),
      new CheckboxFilter('rating', 'rating', 'MEDIUM', { id: 2, value: 'MEDIUM' }, false, 'RATING'),
      new CheckboxFilter('rating_medium', 'rating', 'HIGH', { id: 2, value: 'HIGH' }, false, 'RATING'),
      new CheckboxFilter('stuff', 'stuff', 'Stuff', { id: 2, value: 'MEDIUM' }, false, 'STUFF'),
      new CheckboxFilter('stuff_2', 'stuff', 'Stuff2', { id: 2, value: 'HIGH' }, false, 'STUFF'),
      new CheckboxFilter('alone', 'alone', 'Alone', { id: 2, value: 'HIGH' }, false, 'ALONE'),
      new CheckboxFilter('t', 'not_group', 'no group', { id: 2, value: 'HIGH' }, false),
      new AutocompleteMultipleFilter('multiple', 'multiple', 'mmultiple', () => this.pizzaService.getPizzaBases(), [
        {
          id: 1,
          value: 'Tomato',
        },
        { id: 2, value: 'Cheese' },
      ])
    );

    this.filterBehaviours = [
      {
        emitters: [this.filters.get('restaurant')],
        events: [new FilterClearEvent(), new FilterValidValueChangeEvent()],
        callbacks: [
          () =>
            (this.filters.get('base') as AutocompleteFilter).updateFilterOptions(
              this.filters.get('restaurant').param ? [this.filters.get('restaurant').param] : null
            ),
        ],
      },
    ];
  }

  public foodieTypeChanged(event: MatSelectChange) {
    this.selectedFoodieType = event.value;
  }

  public index(reset: boolean): void {
    const pizzaParams: FilterParam[] = [...this.queryParams, ...this.filterParams];

    console.log(this.filters.toQueryParam());

    this.pizzaService
      .getPizzasList(pizzaParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
    this.indexCount++;
  }

  public ngOnInit() {
    this.dataSource = new GenericDataSource();
    this.displayedColumns = ['id', 'name', 'base', 'restaurant', 'price', 'rating', 'ratingDate'];

    this.loadFilterBoxFilters();
    this.index(true);
  }

  public search(value: string) {
    const i = this.queryParams.findIndex((p: FilterParam) => p.name === 'name');

    if (value && i === -1) {
      this.queryParams.push({ name: 'name', value });
    } else if (i > -1) {
      if (value) {
        this.queryParams[i].value = value;
      } else {
        this.queryParams.splice(i, 1);
      }
    }

    this.index(true);
  }
}
