import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomColorAutocompleteFilterComponent } from './random-color-autocomplete-filter.component';

describe('RandomColorAutocompleteFilterComponent', () => {
  let component: RandomColorAutocompleteFilterComponent;
  let fixture: ComponentFixture<RandomColorAutocompleteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomColorAutocompleteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomColorAutocompleteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
