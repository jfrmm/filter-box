import { FilterModel } from './filter.model';
import { FilterHelperService } from '../filter-helper.service';

export interface FilterComponentModel {
  filter: FilterModel;

  filterHelper: FilterHelperService;
}
