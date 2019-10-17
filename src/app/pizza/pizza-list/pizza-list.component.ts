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

  public filterConfig: FilterBoxConfig;

  public filters = new FilterArray();

  public foodieTypes: FilterOption[];

  public indexCount = 0;

  public selectedFoodieType: FilterOption;

  constructor(private readonly pizzaService: PizzaService, private readonly foodieTypeService: FoodieTypeService) {}

  /**
   * This method is an example of how we can override the default
   * Filter Box config. Add this data bind [filterConfig]="filterConfig"
   * in <asp-filter-box>
   */
  private configFilterBox() {
    this.filterConfig = {
      buttons: {
        clearAll: 'none',
      },
    };
  }

  private loadFilterBoxFilters(): void {
    this.filters.push(
      new AutocompleteFilter('base', 'Base', () => this.pizzaService.getPizzaBases(), null),
      new AutocompleteAsyncFilter('restaurant', 'Restaurant', () => this.pizzaService.getRestaurants()),
      new DateFilter('from', 'From'),
      new DateFilter('to', 'To'),
      new SelectFilter('select', 'select', () => this.pizzaService.getPizzaBases()),
      new CheckboxFilter('rating', 'MEDIUM', { id: 2, value: 'MEDIUM' }),
      new AutocompleteMultipleFilter('multiple', 'mmultiple', () => this.pizzaService.getPizzaBases(), null)
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

    this.configFilterBox();
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
