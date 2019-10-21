# Filter Box Library

This package provides a simple way to add filters to an Angular application, abstracting from all the logic.
Additionally, it allows the definition of complex event based behaviours, triggered by changes in the filters value or state.

> **Filter Box** is an Angular package developed by ALTER SOLUTIONS PORTUGAL. It has been developed using Angular 8.0.

## Table of Contents

- [Getting started](#getting-started)
- [Usage](#usage)
  - [Configuration](#configuration)
    - [Default](#default)
    - [Customize at app-level](#customize-at-app-level)
    - [Customize at component-level](#customize-at-component-level)
  - [Basic filters](#basic-filters)
  - [Defining filter behaviours](#defining-filter-behaviours)
  - [Custom filters](#custom-filters)
  - [FilterArray](#filter-array)

## Getting started

Run `npm install @asp-devteam/filter-box` to install the package in your project.

> Be aware that this package requires some peer dependencies to be installed:
>
> - "@angular/common"
> - "@angular/cdk"
> - "@angular/core"
> - "@angular/material"
> - "@angular/flex-layout"

## Usage

Next import the `FilterBoxModule` into your application.

```typescript
import { FilterBoxModule } from '@asp-devteam/filter-box';

@NgModule({
  declarations: [AppComponent],
  imports: [FilterBoxModule.forRoot()],
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
  imports: [FilterBoxModule.forRoot()],
  exports: [FilterBoxModule]
})
export class SharedModule {}
```

### Configuration

The default FilterBox configuration, with the type `FilterBoxConfig`, is set at `projects/filter-box-library/src/configs/configuration.ts`

#### Customize at app-level

Copy the default FilterBox configuration to your app, and modify as needed. Then, add it the `FilterBoxModule`, like so

```typescript
import { filterBoxConfiguration } from '../configs/filter-box.configuration';

@NgModule({
  declarations: [],
  imports: [FilterBoxModule.forRoot(filterBoxConfiguration)],
  exports: [FilterBoxModule]
})
```

#### Customize at component-level

You can also customize the config at a component-level, using input data binding.

Set your configuration first

```typescript
public filterConfig: FilterBoxConfig = {
  buttons: {
    clearAll: 'full',
  },
};
```

And bind it to the FilterBox component

```html
<asp-filter-box ... [filterConfig]="filterConfig"></asp-filter-box>
```

### Basic filters

This package provides four commonly used filters:

<ul>
    <li>Autocomplete Filter</li>
    <li>Autocomplete Async Filter</li>
    <li>Checkbox Filter</li>
    <li>Date Filter</li>
</ul>

To set up a FilterBox, start by instanciating the filters you want to use.

```typescript
import { AutocompleteFilter, CheckboxFilter, FilterArray } from '@asp-devteam/filter-box';

filters: FilterArray = new FilterArray();

this.filters.push(new AutocompleteFilter('base', 'Base', pizzaBases), new CheckboxFilter('rating', ratings));
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

> Make sure that the FilterBox template is only shown after the filters data has been loaded and the behaviours set

### Defining filter behaviours

Out of the box, the filters will emit for the default events `FilterValidValueChangeEvent` and `FilterClearEvent`, so, if you just want to get the filter parameters to apply directly to your main list, you don't need to define specific filter behaviours.

On the other hand, if you need to capture different events, or capture events on one filter to affect another, you can do so by creating a `FilterBehaviour` array like this:

```typescript
import { FilterBehaviour, FilterValidValueChangeEvent } from '@asp-devteam/filter-box';

filterBehaviours: FilterBehaviour[];

this.filterBehaviours = [
  {
    emitters: [this.filters.get('filterParamName'),
    events: [new FilterValidValueChangeEvent()],
    callbacks: [() => this.filters.get('filter2ParamName').disableFilter()]
  }
];
```

And adding the behaviours array to the template:

```html
<asp-filter-box [filters]="filters" [filterBehaviours]="filterBehaviours" (index)="index(true)"></asp-filter-box>
```

> A callback must always return a `FilterEvent`. If your callback is a custom defined function, just return a `FilterEmptyEvent`.

The available events are

```typescript
import {
  FilterClearEvent,
  FilterDisabledEvent,
  FilterEmptyEvent,
  FilterEnabledEvent,
  FilterValidValueChangeEvent
} from '@asp-devteam/filter-box';
```

> Note that you can use the `FilterArray` class instead of a `Filter[]`, gaining access to the method `get(paramName)`. This helps making your code more legible and less error prone.

For more information on behaviours, see the [advanced filter behaviours guide](./docs/advanced-filter-behaviours.md).

### Custom filters

[Available here](./docs/custom-filters.md)


### Filter Array

The `Filter Array` class not only provides the `Array API` but also some additional helper methods. These are:
  -filterParams -> Returns the filter values as filter params (with grouped values);
  -toQueryParam() -> Returns the queryParamString, built from the filter params;
  -get(name) -> Returns the filter which name matches the given name;

Additionaly, to avoid collisions, the filter array will throw an error if there are two filters with the same name.

---

Copyright 2019 Alter Solutions Portugal
