import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteAsyncComponent } from './autocomplete-async.component';
import { FilterBoxModule } from '../../filter-box.module';

describe('AutocompleteAsyncComponent', () => {
  let component: AutocompleteAsyncComponent;
  let fixture: ComponentFixture<AutocompleteAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FilterBoxModule]
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
