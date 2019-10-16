import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FilterBoxModule } from '../../filter-box.module';
import { AutocompleteFilter } from '../../filters/autocomplete-filter/autocomplete-filter';
import { AutocompleteComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear filter', () => {
    const mockFilter = new AutocompleteFilter('test', 'test', () => of());
    component.filter = mockFilter;

    mockFilter.searchFormControl.setValue('test');
    component.filter = mockFilter;
    fixture.detectChanges();
    expect(mockFilter.searchFormControl.value).toBe('test');
    component.clearSearch(true);
    fixture.detectChanges();
    expect(mockFilter.searchFormControl.value).toBe('test');
    component.clearSearch(false);
    fixture.detectChanges();
    expect(mockFilter.searchFormControl.value).toBe('');
  });
});
