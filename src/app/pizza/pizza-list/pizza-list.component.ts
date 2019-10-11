import { Component, OnInit } from '@angular/core';
import {
  AutocompleteAsyncFilter,
  AutocompleteFilter,
  AutocompleteMultipleFilter,
  CheckboxFilter,
  DateFilter,
  FilterBehaviour,
  FilterClearEvent,
  FilterModel,
  FilterParam,
  FilterValidValueChangeEvent,
  SelectFilter,
} from 'filter-box-library';
import { AutocompleteMultipleComponent } from 'filter-box-library';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RandomColorAutocompleteFilterComponent } from 'src/app/custom-filters/random-color-autocomplete-filter/random-color-autocomplete-filter.component';

import { GenericDataSource } from 'src/app/shared/generic.datasource';
import { PizzaService } from '../shared/pizza.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
})
export class PizzaListComponent implements OnInit {
  get params(): FilterParam[] {
    return this.filters.map(filter => filter.param).filter(filter => filter.value !== null);
  }
  private readonly destroy$ = new Subject();

  public dataSource: GenericDataSource;

  public displayedColumns: string[];

  public filterBehaviours: FilterBehaviour[];

  public filters: FilterModel[];

  public indexCount = 0;

  constructor(private readonly pizzaService: PizzaService) {}

  private loadFilterBoxFilters(): void {
    this.filters.push(
      new AutocompleteFilter('base', 'Base', this.pizzaService.getPizzaBases, null),
      new AutocompleteAsyncFilter('restaurant', 'Restaurant', this.pizzaService.getRestaurants),
      new DateFilter('from', 'From'),
      new DateFilter('to', 'To'),
      new SelectFilter('select', 'select', this.pizzaService.getPizzaBases),
      new CheckboxFilter('rating', 'MEDIUM', { id: 2, value: 'MEDIUM' }),
      new AutocompleteMultipleFilter('multiple', 'mmultiple', this.pizzaService.getPizzaBases, null)
      // new AutocompleteFilter(
      //   'base',
      //   'Custom',
      //   pizzaBases,
      //   null,
      //   this.pizzaService.getPizzaBases,
      //   RandomColorAutocompleteFilterComponent
      // ),
      // new SelectFilter('base', 'Select', pizzaBases),
      // new AutocompleteMultipleFilter('base', 'Multiple', pizzaBases, null, null, AutocompleteMultipleComponent)
    );

    // this.filterBehaviours = [
    //   {
    //     emitters: [this.filters[1]],
    //     events: [new FilterClearEvent(), new FilterValidValueChangeEvent()],
    //     callbacks: [
    //       () =>
    //         (this.filters[0] as AutocompleteFilter).updateFilterOptions(
    //           this.filters[1].param ? [this.filters[1].param] : null
    //         ),
    //     ],
    //   },
    // ];

    // this.filterBehaviours = [
    //   {
    //     emitters: [this.filters[0]],
    //     events: [new FilterClearEvent(), new FilterValidValueChangeEvent()],
    //     callbacks: [() => this.filters[1].clearFilter(), () => this.filters[2].clearFilter()],
    //   },
    //   {
    //     emitters: [this.filters[1]],
    //     events: [new FilterValidValueChangeEvent()],
    //     callbacks: [
    //       () => this.filters[2].disableFilter(),
    //       () => this.filters[4].disableFilter(),
    //       () => this.filters[4].enableFilter(0),
    //       () => this.filters[4].setValue(true, 0),
    //     ],
    //   },
    //   {
    //     emitters: [this.filters[1]],
    //     events: [new FilterClearEvent()],
    //     callbacks: [() => this.filters[2].enableFilter()],
    //   },
    //   {
    //     emitters: [this.filters[2]],
    //     events: [new FilterClearEvent()],
    //     callbacks: [() => this.filters[3].disableFilter(), () => this.filters[4].enableFilter()],
    //   },
    //   {
    //     emitters: [this.filters[3]],
    //     events: [new FilterClearEvent()],
    //     callbacks: [
    //       () => this.filters[0].setValue({ id: 1, value: 'Tomato' }),
    //       () => (this.filters[0] as AutocompleteFilter).updateFilterOptions(this.params),
    //     ],
    //   },
    // ];
    /** TODO:
     * If the goal is to have a group of filters become reactive to eachother
     * Create a function that returns the null event and then call the filters
     * updateFilterOptions inside that function, this way, it will happen at the same time,
     * this is: "not respecting the callback order"
     */
  }

  public index(reset: boolean): void {
    console.log(this.params);
    this.pizzaService
      .getPizzasList(this.params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
    this.indexCount++;
  }

  public ngOnInit() {
    this.filters = [];
    this.dataSource = new GenericDataSource();
    this.displayedColumns = ['id', 'name', 'base', 'restaurant', 'price', 'rating', 'ratingDate'];

    this.loadFilterBoxFilters();
    this.index(true);
  }
}
