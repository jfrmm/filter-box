import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { asyncScheduler, of } from 'rxjs';
import { FilterBoxComponent } from './filter-box.component';
import { FilterBoxModule } from './filter-box.module';
import { AutocompleteFilter } from './filters/autocomplete-filter/autocomplete-filter';
import { FilterArray } from './filters/filter/filter-array';

describe('FilterBoxComponent', () => {
  let component: FilterBoxComponent;
  let fixture: ComponentFixture<FilterBoxComponent>;
  const mockFunction = () => of(null, asyncScheduler);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule.forRoot(null), BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBoxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not render clear all button when there are no filters', () => {
    component.filters = new FilterArray();
    fixture.detectChanges();

    // TODO: Check if this is the right way to text the button
    const clearAllElement: HTMLElement = fixture.nativeElement;
    expect(clearAllElement.textContent).toBe('');
  });

  it('should render clear all button when there are filters', () => {
    component.filters = new FilterArray();
    component.filters.push(new AutocompleteFilter('MOCK', 'MOCK', 'MOCK', mockFunction));
    fixture.detectChanges();

    const clearAllElement: HTMLElement = fixture.nativeElement;
    expect(clearAllElement.textContent).toContain('clear');
  });

  it('should clear all filters and emit only once', () => {
    const mockFilter1 = new AutocompleteFilter('MOCK_1', 'MOCK', 'MOCK', mockFunction);
    const mockFilter2 = new AutocompleteFilter('MOCK', 'MOCK', 'MOCK', mockFunction);
    component.filters = new FilterArray();
    component.filters.push(mockFilter1, mockFilter2);

    const spy = spyOn(component.index, 'emit');

    fixture.detectChanges();

    component.onClickClearAllFilters();
    fixture.detectChanges();

    expect(mockFilter1.formControl.value).toBe('');
    expect(mockFilter2.formControl.value).toBe('');
    expect(spy.calls.count()).toBe(1, 'Should be 1');
  });
});
