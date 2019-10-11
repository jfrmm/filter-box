import { FilterHelperService } from '../filter-helper.service';
import { Filter } from '../filters/filter/filter';

export interface FilterComponentModel {
  filter: Filter;

  filterHelper: FilterHelperService;
}
