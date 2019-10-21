import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { asyncScheduler, of } from 'rxjs';
import { FilterBoxModule } from '../../filter-box.module';
import { AutocompleteFilter } from '../../filters/autocomplete-filter/autocomplete-filter';
import { ClearFilterButtonComponent } from './clear-filter-button.component';

describe('ClearFilterButtonComponent', () => {
  let component: ClearFilterButtonComponent;
  let fixture: ComponentFixture<ClearFilterButtonComponent>;
  const mockFunction = () => of(null, asyncScheduler);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearFilterButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the filter control value', () => {
    const mockFilter = new AutocompleteFilter('MOCK', 'MOCK', 'MOCK', mockFunction, { id: 1, value: 'MOCK' });
    component.filter = mockFilter;

    fixture.detectChanges();

    expect(component.filter.param.value).toBe('1');
    component.onClickClearFilter(new MouseEvent('mock'));

    expect(component.filter.param.value).toBe(null);
  });
});
