import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { FilterComponentModel } from 'filter-box-library';
import { FilterHelperService } from 'filter-box-library';

@Component({
  selector: 'app-random-color-autocomplete-filter',
  templateUrl: './random-color-autocomplete-filter.component.html',
  styleUrls: ['./random-color-autocomplete-filter.component.css'],
})
export class RandomColorAutocompleteFilterComponent implements OnInit, OnDestroy, FilterComponentModel {
  @HostBinding('style.background-color') color = 'red';

  set setColor(color: string) {
    this.color = color;
  }

  private colors: string[] = ['red', 'blue', 'yellow', 'green'];

  private interval;

  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {
    this.getRandomColor();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private getRandomColor(): void {
    this.interval = setInterval(() => {
      this.setColor = this.colors[Math.floor(Math.random() * this.colors.length)];
    }, 100);
  }
}
