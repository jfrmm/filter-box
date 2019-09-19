import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBoxComponent } from './filter-box.component';
import { FilterBoxModule } from './filter-box.module';
import { AutocompleteFilter } from './filters/autocomplete-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterBoxComponent', () => {
  let component: FilterBoxComponent;
  let fixture: ComponentFixture<FilterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule, BrowserAnimationsModule],
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
    component.filters = [];
    fixture.detectChanges();

    // TODO: Check if this is the right way to text the button
    const clearAllElement: HTMLElement = fixture.nativeElement;
    expect(clearAllElement.textContent).toBe('');
  });

  it('should render clear all button when there are filters', () => {
    component.filters = [new AutocompleteFilter('MOCK', 'MOCK', [])];
    fixture.detectChanges();

    const clearAllElement: HTMLElement = fixture.nativeElement;
    expect(clearAllElement.textContent).toContain('clear');
  });

  it('should clear all filters and emit only once', () => {
    const mockFilter1 = new AutocompleteFilter('MOCK', 'MOCK', [{ id: 1, value: 'MOCK' }], { id: 1, value: 'MOCK' });
    const mockFilter2 = new AutocompleteFilter('MOCK', 'MOCK', [{ id: 1, value: 'MOCK' }], { id: 1, value: 'MOCK' });
    component.filters = [mockFilter1, mockFilter2];

    const spy = spyOn(component.index, 'emit');

    fixture.detectChanges();

    component.onClickClearAllFilters();
    fixture.detectChanges();

    expect(mockFilter1.elements.formControl.value).toBe('');
    expect(mockFilter2.elements.formControl.value).toBe('');
    expect(spy.calls.count()).toBe(1, 'Should be 1');
  });
});
