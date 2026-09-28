import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { BUI_COPY_RESET_MS, BUI_ICON_SIZE, BUI_ICONS, BUI_LABELS } from '../../common/bui.constants';
import { BuiCodeBlockMode, BuiDiffRow } from '../../common/bui.types';
import { BuiCodeHelper } from '../../helpers/bui-code.helper';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';

@Component({
  selector: 'bui-code-block',
  imports: [BuiIconComponent],
  templateUrl: './bui-code-block.component.html',
  styleUrl: './bui-code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiCodeBlockComponent {
  private readonly document = inject(DOCUMENT);
  private resetCopied: Subscription | null = null;

  readonly filename = input('');
  readonly mode = input<BuiCodeBlockMode>('code');
  readonly lines = input<string[]>([]);
  readonly diff = input<BuiDiffRow[]>([]);
  readonly code = input<string | null>(null);
  readonly copyLabel = input<string>(BUI_LABELS.copy);
  readonly copiedLabel = input<string>(BUI_LABELS.copied);
  readonly copyAriaLabel = input<string>(BUI_LABELS.copyCode);
  readonly copied = output<string>();

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;

  readonly isCopied = signal(false);

  readonly codeLines = computed(() => BuiCodeHelper.toLines(this.lines()));
  readonly diffRows = computed(() => BuiCodeHelper.toDiffRows(this.diff()));
  readonly stats = computed(() => ({
    added: this.diff().filter(row => row.type === 'add').length,
    removed: this.diff().filter(row => row.type === 'del').length
  }));
  readonly raw = computed(() => this.code() ?? this.lines().join('\n'));

  constructor() {
    inject(DestroyRef).onDestroy(() => this.resetCopied?.unsubscribe());
  }

  copy(): void {
    const clipboard = this.document.defaultView?.navigator.clipboard;
    if (!clipboard) return;

    const text = this.raw();
    clipboard.writeText(text).then(() => {
      this.isCopied.set(true);
      this.copied.emit(text);
      this.resetCopied?.unsubscribe();
      this.resetCopied = timer(BUI_COPY_RESET_MS).subscribe(() => this.isCopied.set(false));
    });
  }
}
