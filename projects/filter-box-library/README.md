# Filter Box Library

This package provides a simple way to add filters to an Angular application, abstracting from all the logic.
Additionally, it provides an easy way to define complex event based behaviours, triggered by changes in the filters value or state.

> **Filter Box** is an Angular package developed by ALTER SOLUTIONS PORTUGAL. It has been developed using Angular 8.0.

## Table of Contents

- [Getting started](#getting-started)
- [Usage](#usage)
  - [Basic filters](#basic-filters)
  - [Defining filter behaviours](#defining-filter-behaviours)
  - [Custom filters](#custom-filters)

## Getting started

Run `npm install @asp-devteam/filter-box` to install the package in your project.

## Usage

Next import the `FilterBoxModule` into your application.

```typescript
import { FilterBoxModule } from '@asp-devteam/filter-box';

@NgModule({
  declarations: [AppComponent],
  imports: [FilterBoxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

If you intend to use the FilterBox in multiple places accross your app, its recommended that you create a separate NgModule that imports and then exports all of your shared modules.

```typescript
import { FilterBoxModule } from '@asp-devteam/filter-box';

@NgModule({
  declarations: [],
  imports: [FilterBoxModule],
  exports: [FilterBoxModule]
})
export class SharedModule {}
```

### Basic filters

This package provides four commonly used filters:

<ul>
    <li>Autocomplete Filter</li>
    <li>Autocomplete Async Filter</li>
    <li>Checkbox Filter</li>
    <li>Date Filter</li>
</ul>

To set up a Filter Box, start by instanciating the filters you want to use.

```typescript
import {
  AutocompleteFilter,
  CheckboxFilter,
  FilterModel
} from '@asp-devteam/filter-box';

filters: FilterModel[] = [];

this.filters.push(
  new AutocompleteFilter('base', 'Base', pizzaBases),
  new CheckboxFilter('rating', ratings)
);
```

Next, insert the `FilterBoxComponent` selector in your template.

```html
<asp-filter-box [filters]="filters"></asp-filter-box>
```

Create a getter for the filter parameters (which will be used as query parameters in an HTTP request), and listen for changes in your filters values.

```typescript
import { FilterParam } from '@asp-devteam/filter-box';

get queryParams(): FilterParam[] {
  return this.filters.map(filter => filter.param).filter(filter => filter.value !== null);
}

public index(): void {
  this.someService
    .getList(this.queryParams)
    .subscribe(response => {
      // Do something
    });
}
```

And add it to your template.

```html
<asp-filter-box [filters]="filters" (index)="index()"></asp-filter-box>
```

> Make sure that the Filter Box template is only shown after the filters data has been loaded and the behaviours set

### Defining filter behaviours

If you want to define a filter dependent behaviour, you can do so by creating a `FilterBehaviour` array like this:

```typescript
import { FilterBehaviour, FilterValidValueChangeEvent } from '@asp-devteam/filter-box';

filterBehaviours: FilterBehaviour[];

this.filterBehaviours = [
  {
    emitters: [this.filters[0]],
    events: [new FilterValidValueChangeEvent()],
    callbacks: [() => this.filters[1].disableFilter()]
  }
];
```

And adding the behaviours array to the template:

```html
<asp-filter-box [filters]="filters" [filterBehaviours]="filterBehaviours" (index)="index(true)"></asp-filter-box>
```

A callback must always return a `FilterEvent`. If your callback is a custom defined function, just return a `FilterEmptyEvent`.

For more information on behaviours,see the [advanced filter behaviours guide](./docs/advanced-filter-behaviours.md).

### Custom filters

[Available here](./docs/custom-filters.md)

---

Copyright 2019 Alter Solutions Portugal
