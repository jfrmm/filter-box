import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[aspFilterAnchor]'
})
export class FilterAnchorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
