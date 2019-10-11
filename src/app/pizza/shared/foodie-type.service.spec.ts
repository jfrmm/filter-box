import { TestBed } from '@angular/core/testing';

import { FoodieTypeService } from './foodie-type.service';

describe('FoodieTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodieTypeService = TestBed.get(FoodieTypeService);
    expect(service).toBeTruthy();
  });
});
