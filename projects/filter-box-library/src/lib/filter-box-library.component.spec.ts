import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBoxLibraryComponent } from './filter-box-library.component';

describe('FilterBoxLibraryComponent', () => {
  let component: FilterBoxLibraryComponent;
  let fixture: ComponentFixture<FilterBoxLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBoxLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBoxLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
