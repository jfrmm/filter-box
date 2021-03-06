import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutocompleteMultipleFilter } from '../../filters/autocomplete-multiple-filter/autocomplete-multiple-filter';
import { AutocompleteMultipleComponent } from './autocomplete-multiple.component';

describe('AutocompleteMultipleComponent', () => {
  let component: AutocompleteMultipleComponent;
  let fixture: ComponentFixture<AutocompleteMultipleComponent>;
  let mockFilter: AutocompleteMultipleFilter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteMultipleComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    mockFilter = new AutocompleteMultipleFilter('test', 'test', 'test', () =>
    of([{ id: 1, value: '1' }, { id: 2, value: '2' }, { id: 3, value: '3' }])
  );
    fixture = TestBed.createComponent(AutocompleteMultipleComponent);
    component = fixture.componentInstance;
    component.filter = mockFilter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear filter', () => {
    mockFilter.searchFormControl.setValue('test');
    fixture.detectChanges();

    expect(mockFilter.searchFormControl.value).toBe('test');
    component.clearSearch(true);
    fixture.detectChanges();

    expect(mockFilter.searchFormControl.value).toBe('test');
    component.clearSearch(false);
    fixture.detectChanges();

    expect(mockFilter.searchFormControl.value).toBe('');
  });

  it('should toggle all options', () => {
    component.masterToggle();
    fixture.detectChanges();

    expect(component.filter.selection.selected.length).toBe(3);

    component.masterToggle();
    fixture.detectChanges();

    expect(component.filter.selection.selected.length).toBe(0);
  });

  it('should return if all options are selected', () => {
    component.masterToggle();
    fixture.detectChanges();

    expect(component.isAllSelected()).toBeTruthy();

    component.masterToggle();

    expect(component.isAllSelected()).toBeFalsy();
  });

  it('should toggle an option', () => {
    const mockOption = { id: 1, value: 'test' };
    component.toggleOption(new MouseEvent('click'), mockOption);
    fixture.detectChanges();

    expect(component.filter.selection.selected[0]).toBe(mockOption);

    component.toggleOption(new MouseEvent('click'), mockOption);

    expect(component.filter.selection.selected.length).toBe(0);
  });
});
