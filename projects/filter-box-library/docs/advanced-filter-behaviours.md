# Advanced Filter Behaviours

Here are described some useful filter behaviours usecases:

## Clear a filter
... when another filter is disabled:

```typescript
   {
          emitters: [this.filters[0]],
          events: [new FilterDisabledEvent()],
          callbacks: [() => this.filters[1].clearFilter()]
    }
```

## Enable/Disable a filter
... when another filter has a valid value

```typescript
    {
          emitters: [this.filters[1]],
          events: [new FilterValidValueChangeEvent()],
          callbacks: [
            () => this.filters[2].disableFilter(),
            () => this.filters[4].enableFilter()
          ]
    }
```

## Reactive Filter

When instanciating a `Autocomplete` reactive filter, make sure to pass the function in the constructor:

```typescript
const autocompleteFilter: AutocompleteFilter =
    new AutocompleteFilter('name', 'Name', names, null, this.getNames)
```
Then, call the `updateFilterOptions` in the callback, with the params you want.

```typescript
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

## Custom Callback

```typescript
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
