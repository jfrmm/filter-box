import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBoxComponent } from './filter-box.component';
import { FilterBoxModule } from './filter-box.module';
import { AutocompleteFilter } from './entities/autocomplete-filter';

describe('FilterBoxComponent', () => {
  let component: FilterBoxComponent;
  let fixture: ComponentFixture<FilterBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBoxComponent);
    component = fixture.componentInstance;
    component.filters = [new AutocompleteFilter('test', 'test1', [])];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
