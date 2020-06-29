import { Component, Input, OnInit } from '@angular/core';
import { FilterHelperService } from '../../services/filter-helper.service';

@Component({
  selector: 'asp-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  @Input()
  public filter;
  constructor(public filterHelper: FilterHelperService) {}

  public ngOnInit(): void {}
}
