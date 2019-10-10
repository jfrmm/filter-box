# Advanced filter behaviours

Here are described some useful filter behaviours use-cases:

## Clear a filter

... when another filter is disabled:

```typescript
import { FilterDisabledEvent } from '@asp-devteam/filter-box';

{
  emitters: [this.filters[0]],
  events: [new FilterDisabledEvent()],
  callbacks: [
    () => this.filters[1].clearFilter()
  ]
}
```

## Enable/disable a filter

... when another filter has a valid value

```typescript
import { FilterValidValueChangeEvent } from '@asp-devteam/filter-box';

{
  emitters: [this.filters[1]],
  events: [new FilterValidValueChangeEvent()],
  callbacks: [
    () => this.filters[2].disableFilter(),
    () => this.filters[4].enableFilter()
  ]
}
```

## Reactive filter

When instanciating a `Autocomplete` reactive filter, make sure to pass the function in the constructor:

```typescript
const autocompleteFilter: AutocompleteFilter = new AutocompleteFilter('name', 'Name', names, null, this.getNames);
```

Then, call the `updateFilterOptions` in the callback, with the params you want.

```typescript
import { AutocompleteFilter, FilterClearEvent } from '@asp-devteam/filter-box';

{
  emitters: [this.filters[3]],
  events: [new FilterClearEvent()],
  callbacks: [
    () => (this.filters[0] as AutocompleteFilter).updateFilterOptions(this.params),
  ]
}
```

Internally, the `getNames` function will be called as `getNames(this.params)`.

Note that the `updateFilterOptions` function always return a `FilterEmptyEvent`.

## Custom callback

```typescript
import { FilterClearEvent, FilterEmptyEvent, FilterEvent } from '@asp-devteam/filter-box';

{
  emitters: [this.filters[3]],
  events: [new FilterClearEvent()],
  callbacks: [
    () => this.doSomething(),
  ]
}

...

doSomething(): FilterEvent {
  // Do something
  return new FilterEvent(new FilterEmptyEvent(), this);
}
```

---

Copyright 2019 Alter Solutions Portugal
