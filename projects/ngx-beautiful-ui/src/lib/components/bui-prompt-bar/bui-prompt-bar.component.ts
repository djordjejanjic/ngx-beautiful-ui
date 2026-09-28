import { ChangeDetectionStrategy, Component, computed, ElementRef, input, model, output, signal, viewChild } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';
import { BuiClickOutsideDirective } from '../../directives/bui-click-outside.directive';
import {
  BUI_ATTACHMENT_STATUS,
  BUI_ICON_SIZE,
  BUI_ICONS,
  BUI_IME_KEY_CODE,
  BUI_KEYBOARD_KEY,
  BUI_LABELS,
  BUI_MENU_NAVIGATION_STEPS,
  BUI_MENU_PLACEMENT
} from '../../common/bui.constants';
import { BuiAttachmentChip, BuiMenuItem } from '../../common/bui.types';
import { BuiMenuHelper } from '../../helpers/bui-menu.helper';
import { BuiGlideMenuComponent } from '../bui-glide-menu/bui-glide-menu.component';

@Component({
  selector: 'bui-prompt-bar',
  imports: [BuiIconComponent, BuiClickOutsideDirective, BuiGlideMenuComponent],
  templateUrl: './bui-prompt-bar.component.html',
  styleUrl: './bui-prompt-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiPromptBarComponent implements FormValueControl<string> {
  readonly value = model('');
  readonly touched = model(false);
  readonly placeholder = input<string>(BUI_LABELS.promptPlaceholder);
  readonly ariaLabel = input<string>(BUI_LABELS.prompt);
  readonly busy = input(false);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly sendDisabled = input(false);
  readonly tall = input(false);
  readonly sendIcon = input<string>(BUI_ICONS.arrowUp);
  readonly sendIconSize = input<string>(BUI_ICON_SIZE.lg);
  readonly plusIconSize = input<string>(BUI_ICON_SIZE.lg);
  readonly attachments = input<BuiAttachmentChip[]>([]);
  readonly menuItems = input<BuiMenuItem[]>([]);
  readonly submitted = output<string>();
  readonly stopped = output<void>();
  readonly menuItemSelected = output<string>();
  readonly attachmentRemoved = output<string>();

  private readonly field = viewChild.required<ElementRef<HTMLTextAreaElement>>('field');

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;
  protected readonly labels = BUI_LABELS;
  protected readonly attachmentStatus = BUI_ATTACHMENT_STATUS;
  protected readonly menuPlacement = BUI_MENU_PLACEMENT.above;

  readonly isMenuOpen = signal(false);
  readonly menuHighlight = signal<number | null>(null);

  readonly hasMenu = computed(() => this.menuItems().length > 0);
  readonly hasAttachments = computed(() => this.attachments().length > 0);
  readonly isUploading = computed(() => this.attachments().some(attachment => attachment.status === BUI_ATTACHMENT_STATUS.uploading));
  readonly hasReadyAttachment = computed(() => this.attachments().some(attachment => attachment.status === BUI_ATTACHMENT_STATUS.ready));
  readonly hasText = computed(() => (this.value() ?? '').trim().length > 0);
  readonly canSubmit = computed(
    () =>
      !this.disabled() &&
      !this.busy() &&
      !this.invalid() &&
      !this.sendDisabled() &&
      !this.isUploading() &&
      (this.hasText() || this.hasReadyAttachment())
  );

  focus(options?: FocusOptions): void {
    this.field().nativeElement.focus(options);
  }

  onInput(text: string): void {
    this.value.set(text);
    this.closeMenu();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.isMenuOpen() && this.handleMenuKey(event)) return;
    if (event.key !== BUI_KEYBOARD_KEY.enter || event.shiftKey || event.isComposing || event.keyCode === BUI_IME_KEY_CODE) return;

    event.preventDefault();
    this.submit();
  }

  toggleMenu(): void {
    this.menuHighlight.set(null);
    this.isMenuOpen.update(isOpen => !isOpen);
    this.focus();
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.menuHighlight.set(null);
  }

  selectMenuItem(id: string): void {
    const item = this.menuItems().find(menuItem => menuItem.id === id);
    if (!item || item.disabled) return;

    this.closeMenu();
    this.menuItemSelected.emit(id);
  }

  submit(): void {
    if (!this.canSubmit()) return;

    this.submitted.emit((this.value() ?? '').trim());
    this.value.set('');
    this.closeMenu();
  }

  stop(): void {
    this.stopped.emit();
  }

  removeAttachment(id: string): void {
    this.attachmentRemoved.emit(id);
  }

  markTouched(): void {
    this.touched.set(true);
  }

  private handleMenuKey(event: KeyboardEvent): boolean {
    if (event.key === BUI_KEYBOARD_KEY.escape) {
      event.preventDefault();
      this.closeMenu();
      return true;
    }

    if (event.key === BUI_KEYBOARD_KEY.tab) {
      this.closeMenu();
      return true;
    }

    const step = BuiMenuHelper.navigationStep(event.key);
    if (step !== null) {
      event.preventDefault();
      this.menuHighlight.set(BuiMenuHelper.nextEnabledIndex(this.menuItems(), this.menuHighlight(), step));
      return true;
    }

    const isPick = event.key === BUI_KEYBOARD_KEY.enter && !event.shiftKey;
    const firstStep = BUI_MENU_NAVIGATION_STEPS[BUI_KEYBOARD_KEY.arrowDown];
    const index = this.menuHighlight() ?? BuiMenuHelper.nextEnabledIndex(this.menuItems(), null, firstStep);
    if (!isPick || index === null) return false;

    event.preventDefault();
    this.selectMenuItem(this.menuItems()[index].id);
    return true;
  }
}
