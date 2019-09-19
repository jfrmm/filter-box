import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMultipleComponent } from './autocomplete-multiple.component';

describe('AutocompleteMultipleComponent', () => {
  let component: AutocompleteMultipleComponent;
  let fixture: ComponentFixture<AutocompleteMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
