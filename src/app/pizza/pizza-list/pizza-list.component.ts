import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../shared/pizza.service';
import { Subject } from 'rxjs';
import { Filter } from 'dist/filter-box-library/public-api';
import { GenericDataSource } from 'src/app/shared/generic.datasource';
import { takeUntil } from 'rxjs/operators';

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

  constructor(private pizzaService: PizzaService) {}

  ngOnInit() {
    this.filters = [];
    this.dataSource = new GenericDataSource();
    this.displayedColumns = ['id', 'name', 'base', 'restaurant', 'price', 'rating'];

    this.index(true);
  }

  private index(reset: boolean): void {
    this.pizzaService
      .getPizzasList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.dataSource.update(response.elements, reset);
      });
  }
}
