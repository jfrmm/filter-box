import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterModel } from './models/filter.model';
import { FilterHelperService } from './filter-helper.service';
import { FilterMediatorService } from './filter-mediator.service';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { FilterAnchorDirective } from './filter-anchor.directive';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteFilter } from './filters/autocomplete-filter';
import { FilterComponentModel } from './models/filter-component.model';


@Component({
  selector: 'asp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  providers: [FilterMediatorService],
})
export class FilterBoxComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  @Input()
  public filterBehaviours: FilterBehaviour[];

  @Input()
  public filters: FilterModel[];

  @Output()
  public index = new EventEmitter();

  @ViewChild(FilterAnchorDirective, { static: true }) filterAnchorDirective: FilterAnchorDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private filterMediatorService: FilterMediatorService,
    public filterHelper: FilterHelperService
  ) {}

  ngOnInit() {
    this.subscriptions = new Subscription();

    this.filterMediatorService.setFilters(this.filters, this.filterBehaviours);

    this.subscriptions.add(this.filterMediatorService.filterChanged.subscribe(() => this.index.emit()));

    this.loadFiltersComponents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadFiltersComponents(): void {
    this.filters.forEach(filter => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(filter.component);

      const viewContainerRef = this.filterAnchorDirective.viewContainerRef;

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as FilterComponentModel).filter = filter;
    });
  }

  public onClickClearAllFilters(): void {
    this.filters.forEach((filter: FilterModel) => filter.clearFilter());

    this.index.emit();
  }
}
