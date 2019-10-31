import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { configuration } from './configs/configuration';
import { FilterAnchorDirective } from './filter-anchor.directive';
import { Filter } from './filters/filter/filter';
import { FilterBehaviour } from './models/filter-behaviour.model';
import { FilterBoxConfig } from './models/filter-box-config.model';
import { FilterComponentModel } from './models/filter-component.model';
import { FilterBoxConfigService } from './services/filter-box-config.service';
import { FilterHelperService } from './services/filter-helper.service';
import { FilterMediatorService } from './services/filter-mediator.service';

@Component({
  selector: 'asp-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  providers: [FilterMediatorService],
})
export class FilterBoxComponent implements OnInit {
  @Input()
  public set filterConfig(value: FilterBoxConfig) {
    if (value) {
      this.updateConfig(value);
    }
  }

  public config: FilterBoxConfig = configuration;

  @ViewChild(FilterAnchorDirective, { static: true }) public filterAnchorDirective: FilterAnchorDirective;

  @Input()
  public filterBehaviours: FilterBehaviour[];

  @Input()
  public filters: Filter[];

  @Output()
  public index = new EventEmitter();

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly filterMediatorService: FilterMediatorService,
    public filterHelper: FilterHelperService,
    @Inject(FilterBoxConfigService) private readonly filterBoxConfigService
  ) {
    this.updateConfig(this.filterBoxConfigService);
  }

  private loadFiltersComponents(): void {
    this.filters.forEach(filter => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(filter.component);

      const viewContainerRef = this.filterAnchorDirective.viewContainerRef;

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as FilterComponentModel).filter = filter;
    });
  }

  private updateConfig(config: FilterBoxConfig) {
    if (config) {
      this.updateConfigButtons(config);
      this.updateConfigFlex(config);
    }
  }

  private updateConfigButtons(config: FilterBoxConfig) {
    this.config.buttons = config.buttons;
  }

  private updateConfigFlex(config: FilterBoxConfig) {
    switch (config.buttons.clearAll) {
      case 'none':
        this.config.flex.offset = {
          left: '0px',
        };
        break;
      case 'simple':
        this.config.flex.offset = {
          left: '40px',
        };
        break;
      case 'full':
        this.config.flex.offset = {
          left: '120px',
        };
        break;
    }
  }

  public ngOnInit() {
    this.filterMediatorService.setFilters(this.filters, this.filterBehaviours);

    this.filterMediatorService.filterChanged.subscribe(() => this.index.emit());

    this.loadFiltersComponents();
  }

  public onClickClearAllFilters(): void {
    this.filters.forEach((filter: Filter) => filter.clearFilter());

    this.index.emit();
  }
}
