import { DOCUMENT } from '@angular/common';
import { afterNextRender, booleanAttribute, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { BUI_STICK_TO_BOTTOM_THRESHOLD_PX } from '../common/bui.constants';

@Directive({
  selector: '[buiStickToBottom]',
  host: {
    '(scroll)': 'onScroll()'
  }
})
export class BuiStickToBottomDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private pinned = true;

  readonly buiStickToBottom = input(true, { transform: booleanAttribute });

  constructor() {
    const view = inject(DOCUMENT).defaultView;
    const observer = view?.ResizeObserver ? new view.ResizeObserver(() => this.follow()) : null;
    afterNextRender(() => {
      const content = this.element.firstElementChild;
      if (content) observer?.observe(content);
      observer?.observe(this.element);
      this.follow();
    });
    inject(DestroyRef).onDestroy(() => observer?.disconnect());
  }

  onScroll(): void {
    const { scrollHeight, scrollTop, clientHeight } = this.element;
    this.pinned = scrollHeight - scrollTop - clientHeight <= BUI_STICK_TO_BOTTOM_THRESHOLD_PX;
  }

  private follow(): void {
    if (this.pinned && this.buiStickToBottom()) this.element.scrollTop = this.element.scrollHeight;
  }
}
