import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterAnchorDirective } from './filter-anchor.directive';
import { FilterHelperService } from './filter-helper.service';
import { FilterMediatorService } from './filter-mediator.service';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { FilterComponentModel } from './models/filter-component.model';
import { FilterModel } from './models/filter.model';
import { FilterBox } from './models/filter-box.model';

@Component({
  selector: 'asp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  providers: [FilterMediatorService],
})
export class FilterBoxComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;

  @ViewChild(FilterAnchorDirective, { static: true }) public filterAnchorDirective: FilterAnchorDirective;

  @Input()
  public filterBehaviours: FilterBehaviour[];

  @Input()
  public filters: FilterModel[];

  @Input()
  public filterBox: FilterBox;

  @Output()
  public index = new EventEmitter();

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly filterMediatorService: FilterMediatorService,
    public filterHelper: FilterHelperService
  ) {}

  private loadFiltersComponents(): void {
    this.filters.forEach(filter => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(filter.component);

      const viewContainerRef = this.filterAnchorDirective.viewContainerRef;

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as FilterComponentModel).filter = filter;
    });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public ngOnInit() {
    this.subscriptions = new Subscription();

    this.filterMediatorService.setFilters(this.filters, this.filterBehaviours);

    this.subscriptions.add(this.filterMediatorService.filterChanged.subscribe(() => this.index.emit()));

    this.loadFiltersComponents();
    this.setupFilterBox();
  }

  public onClickClearAllFilters(): void {
    this.filters.forEach((filter: FilterModel) => filter.clearFilter());

    this.index.emit();
  }

  private setupFilterBox() {
    this.filterBox = this.filterBox ? this.filterBox : { clearAll: 'simple' };

    this.setupFlexOffsets();
  }

  private setupFlexOffsets() {
    switch (this.filterBox.clearAll) {
      case 'none':
        this.filterBox.offset = {
          left: '0px',
        };
        break;
      case 'full':
        this.filterBox.offset = {
          left: '120px',
        };
        break;
      case 'simple':
      default:
        this.filterBox.offset = {
          left: '40px',
        };
        break;
    }
  }
}
