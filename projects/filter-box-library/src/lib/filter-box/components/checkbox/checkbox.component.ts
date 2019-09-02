import { Component, OnInit, Input } from '@angular/core';
import { CheckboxFilter } from '../../filters/checkbox-filter';
import { FilterHelperService } from '../../filter-helper.service';

@Component({
  selector: 'asp-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  @Input()
  public filter: CheckboxFilter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
