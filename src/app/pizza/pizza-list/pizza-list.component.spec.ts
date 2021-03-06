import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaModule } from '../pizza.module';
import { PizzaListComponent } from './pizza-list.component';

describe('PizzaListComponent', () => {
  let component: PizzaListComponent;
  let fixture: ComponentFixture<PizzaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PizzaModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
