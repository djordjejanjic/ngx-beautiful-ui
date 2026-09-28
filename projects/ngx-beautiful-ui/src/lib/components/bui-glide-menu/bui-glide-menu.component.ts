import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  linkedSignal,
  model,
  output,
  viewChildren
} from '@angular/core';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';
import { BUI_ICON_SIZE, BUI_KEYBOARD_KEY, BUI_MENU_NAVIGATION_STEPS, BUI_MENU_PLACEMENT } from '../../common/bui.constants';
import { BuiMenuItem, BuiMenuPlacement } from '../../common/bui.types';
import { BuiMenuHelper } from '../../helpers/bui-menu.helper';

@Component({
  selector: 'bui-glide-menu',
  imports: [BuiIconComponent],
  templateUrl: './bui-glide-menu.component.html',
  styleUrl: './bui-glide-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiGlideMenuComponent {
  private readonly document = inject(DOCUMENT);

  readonly items = input.required<BuiMenuItem[]>();
  readonly placement = input<BuiMenuPlacement>(BUI_MENU_PLACEMENT.below);
  readonly dense = input(false);
  readonly autoFocus = input(false);
  readonly itemIconSize = input<string>(BUI_ICON_SIZE.base);
  readonly ariaLabel = input<string | null>(null);
  readonly highlightIndex = model<number | null>(null);
  readonly itemSelected = output<string>();
  readonly dismissed = output<void>();

  private readonly rows = viewChildren<ElementRef<HTMLButtonElement>>('row');

  protected readonly iconSize = BUI_ICON_SIZE;
  protected readonly placements = BUI_MENU_PLACEMENT;

  readonly highlightPosition = linkedSignal<number | null, number>({
    source: this.highlightIndex,
    computation: (index, previous) => index ?? previous?.value ?? 0
  });

  constructor() {
    afterNextRender(() => {
      if (this.autoFocus()) this.focusFirst();
    });
  }

  focusFirst(): void {
    this.focusRow(BuiMenuHelper.nextEnabledIndex(this.items(), null, BUI_MENU_NAVIGATION_STEPS[BUI_KEYBOARD_KEY.arrowDown]));
  }

  select(item: BuiMenuItem): void {
    if (item.disabled) return;
    this.itemSelected.emit(item.id);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === BUI_KEYBOARD_KEY.escape) {
      event.preventDefault();
      this.dismissed.emit();
      return;
    }

    const step = BuiMenuHelper.navigationStep(event.key);
    if (step === null) return;

    event.preventDefault();
    this.focusRow(BuiMenuHelper.nextEnabledIndex(this.items(), this.focusedIndex() ?? this.highlightIndex(), step));
  }

  onMouseLeave(): void {
    this.highlightIndex.set(this.focusedIndex());
  }

  onFocusOut(event: FocusEvent): void {
    const menu = event.currentTarget instanceof Element ? event.currentTarget : null;
    const nextFocus = event.relatedTarget instanceof Node ? event.relatedTarget : null;
    if (!menu?.contains(nextFocus)) this.highlightIndex.set(null);
  }

  private focusRow(index: number | null): void {
    if (index === null) return;

    this.highlightIndex.set(index);
    this.rows()[index]?.nativeElement.focus({ preventScroll: true });
  }

  private focusedIndex(): number | null {
    const index = this.rows().findIndex(row => row.nativeElement === this.document.activeElement);
    return index === -1 ? null : index;
  }
}
