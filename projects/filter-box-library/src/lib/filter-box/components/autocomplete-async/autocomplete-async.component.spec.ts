import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FilterBoxModule } from '../../filter-box.module';
import { AutocompleteAsyncFilter } from '../../filters/autocomplete-async-filter/autocomplete-async-filter';
import { AutocompleteAsyncComponent } from './autocomplete-async.component';

describe('AutocompleteAsyncComponent', () => {
  let component: AutocompleteAsyncComponent;
  let fixture: ComponentFixture<AutocompleteAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear filter', () => {
    const mockFilter = new AutocompleteAsyncFilter('test', 'test', 'test', () => of());
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
