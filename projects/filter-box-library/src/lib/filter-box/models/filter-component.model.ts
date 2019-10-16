import { Filter } from '../filters/filter/filter';
import { FilterHelperService } from '../services/filter-helper.service';

export interface FilterComponentModel {
  filter: Filter;

  filterHelper: FilterHelperService;
}
