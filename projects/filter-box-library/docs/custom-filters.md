# Custom filters

## Table of Contents

- [Presentation vs Functionality](#presentation-vs-functionality)
- [Custom Presentation](#custom-presentation)
- [Custom Functionality](#custom-functionality)
  - [Extend From Filter](#extend-from-filter)
  - [Create A Filter From Scratch](#create-a-filter-from-scratch)

Be aware that to create a custom filter, you are expected to have some insight on the inner workings of both filters and behaviours.

## Presentation vs Functionality

.. defining a custom filter from scratch can be a huge undertaking. (dont forget the behaviour system...)

## Custom Presentation

To change only a filter presentation, you can create a custom `Component`:

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

This component will change the filter background color every 100ms. We want to use the default autocomplete template, so we can just insert it. All the default filter templates accept a `input binding` filter property.

```html
<asp-autocomplete [filter]="filter"></asp-autocomplete>
```

Then, add the custom `Component` to the filter constructor:

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

### Create A Filter From Scratch

To keep the same filterbox behaviour when clearing the filter, dont forget to include the provided `clear-filter-button-component`:

```html
<asp-clear-filter-button [disabled]="!filter.elements.formControl.value" [filter]="filter"></asp-clear-filter-button>
```
