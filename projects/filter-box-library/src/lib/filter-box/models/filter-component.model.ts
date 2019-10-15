import { FilterHelperService } from '../services/filter-helper.service';
import { FilterModel } from './filter.model';

export interface FilterComponentModel {
  filter: FilterModel;

  filterHelper: FilterHelperService;
}
