import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[buiClickOutside]',
  host: {
    '(document:mousedown)': 'onDocumentMousedown($event)'
  }
})
export class BuiClickOutsideDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly clickOutside = output<MouseEvent>();

  onDocumentMousedown(event: MouseEvent): void {
    const target = event.target;
    if (target instanceof Node && !this.elementRef.nativeElement.contains(target)) this.clickOutside.emit(event);
  }
}
