import { FilterHelperService } from '../filter-helper.service';
import { FilterModel } from './filter.model';

export interface FilterComponentModel {
  filter: FilterModel;

  filterHelper: FilterHelperService;
}
