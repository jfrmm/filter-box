import { Component, OnInit, Input } from '@angular/core';
import { FilterHelperService } from '../../filter-helper.service';

@Component({
  selector: 'asp-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  @Input()
  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {}
}
