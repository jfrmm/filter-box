import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FilterComponentModel } from 'filter-box-library';
import { FilterHelperService } from 'filter-box-library';

@Component({
  selector: 'app-random-color-autocomplete-filter',
  templateUrl: './random-color-autocomplete-filter.component.html',
  styleUrls: ['./random-color-autocomplete-filter.component.css'],
})
export class RandomColorAutocompleteFilterComponent implements OnInit, OnDestroy, FilterComponentModel {

  set setColor(color: string) {
    this.color = color;
  }

  private readonly colors: string[] = ['red', 'blue', 'yellow', 'green'];

  private interval;
  @HostBinding('style.background-color') public color = 'red';

  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  private getRandomColor(): void {
    this.interval = setInterval(() => {
      this.setColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    }, 100);
  }

  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  public ngOnInit() {
    this.getRandomColor();
  }
}
