import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteAsyncComponent } from './autocomplete-async.component';

describe('AutocompleteAsyncComponent', () => {
  let component: AutocompleteAsyncComponent;
  let fixture: ComponentFixture<AutocompleteAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteAsyncComponent ]
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
});
