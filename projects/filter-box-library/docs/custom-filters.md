# Custom filters

Be aware that to create a custom filter, you are expected to have some knowledge on both filters and behaviours.

## Table of Contents

- [Custom Presentation](#custom-presentation)
- [Custom Functionality](#custom-functionality)
  - [Extend From Filter](#extend-from-filter)
  - [Create A Filter From Scratch](#create-a-filter-from-scratch)

## Custom Presentation

To change a filter presentation, you can create a custom `component`:

```typescript
@HostBinding('style.background-color') color = 'red';

  set setColor(color: string) {
    this.color = color;
  }

  private colors: string[] = ['red', 'blue', 'yellow', 'green'];

  private interval;

  public filter;

  constructor(public filterHelper: FilterHelperService) {}

  ngOnInit() {
    this.getRandomColor();
  }
```

This `component` will change the filter background color every 100ms. We want to use the default autocomplete template, so we can just insert it. All the default filter templates accept a `input binding` filter property.

```html
<asp-autocomplete [filter]="filter"></asp-autocomplete>
```

Then, add the custom `component` to the filter constructor:

```typescript
new AutocompleteFilter(
  'custom',
  'Custom',
  pizzaBases,
  null,
  this.pizzaService.getPizzaBases,
  RandomColorAutocompleteFilterComponent
);
```

## Custom Functionality

To create a filter with a custom functionality there are two options: To extend from an existing filter and change only the desired behaviours or to create a new filter from scratch.

### Extend From Existing Filter

When the new filter is just a slighty tweaked version of an existing one, you can create a new class that extends the base filter, and override only the methods you want.

```typescript
export class SelectFilter extends AutocompleteFilter {
 get type(): string {
    return 'select';
  }

  protected filterOptions(): Observable<FilterOption[]> {
    return of(this.initialOptions);
  }
```

When the filter is instanciated `new SelectFilter('select', 'Select', pizzaBases)`, it will look just like the `AutocompleteFilter` base filter, the exception being that when writing in the input no options are filtered.

To make it look like a real `SelectOption`, create a new `component` and add your custom template:

```html
<div *ngIf="filter">
  <mat-form-field>
    <mat-select [formControl]="filter?.formControl" [placeholder]="filter?.placeholder">
      <mat-option *ngFor="let filterOption of filter?.options | async" [value]="filterOption">
        {{ filterOption.value }}
      </mat-option>
    </mat-select>
  </mat-form-field>

  <asp-clear-filter-button [disabled]="!filter.formControl.value" [filter]="filter"></asp-clear-filter-button>
</div>
```

Add the `component` to the `Module` `entryComponents` and to the custom filter component property:

```typescript
entryComponents: [RandomColorAutocompleteFilterComponent, SelectFilterComponent]

...

export class SelectFilter extends AutocompleteFilter {
  public component: Type<any> = SelectFilterComponent;

```

> To keep a consistent filterbox behaviour when clearing the filter, dont forget to include the provided `clear-filter-button-component` in your custom templates:

```html
<asp-clear-filter-button [disabled]="!filter.formControl.value" [filter]="filter"></asp-clear-filter-button>
```

### Create A Filter From Scratch

When creating a new filter from scratch dont forget to keep in mind the filter behaviour system.

---

Copyright 2019 Alter Solutions Portugal
