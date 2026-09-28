import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, model, output, signal, viewChild } from '@angular/core';
import {
  BUI_DIFF_PREVIEW,
  BUI_DIFF_SIGNS,
  BUI_ICON_SIZE,
  BUI_ICONS,
  BUI_LABELS,
  BUI_POPOVER_OPEN_SELECTOR,
  BUI_TOOL_CHIPS_FILE_CLASS
} from '../../common/bui.constants';
import { BuiDiffPreview, BuiFileDiff, BuiFileDiffView, BuiToolStep, BuiToolStepView } from '../../common/bui.types';
import { BuiSelectHelper } from '../../helpers/bui-select.helper';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';

@Component({
  selector: 'bui-tool-chips',
  imports: [BuiIconComponent],
  templateUrl: './bui-tool-chips.component.html',
  styleUrl: './bui-tool-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiToolChipsComponent {
  private readonly document = inject(DOCUMENT);

  readonly heading = input('');
  readonly steps = input<BuiToolStep[]>([]);
  readonly files = input<BuiFileDiff[]>([]);
  readonly moreLabel = input('');
  readonly showDiffLabel = input<string>(BUI_LABELS.showDiff);
  readonly expanded = model(true);
  readonly expandedStepIds = model<string[]>([]);
  readonly moreClicked = output<void>();

  private readonly previewElement = viewChild.required<ElementRef<HTMLElement>>('previewPopover');

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;
  protected readonly previewWidth = BUI_DIFF_PREVIEW.width;

  readonly preview = signal<BuiDiffPreview | null>(null);

  readonly stepViews = computed<BuiToolStepView[]>(() => {
    const expanded = this.expandedStepIds();
    return this.steps().map(step => ({ ...step, expanded: expanded.includes(step.id), detail: step.detail ?? [] }));
  });

  readonly fileViews = computed<BuiFileDiffView[]>(() =>
    this.files().map(file => ({
      ...file,
      ariaLabel: `${this.showDiffLabel()} ${file.file}`,
      lines: (file.lines ?? []).map(line => ({ ...line, sign: BUI_DIFF_SIGNS[line.tone] }))
    }))
  );

  toggle(): void {
    this.expanded.update(expanded => !expanded);
  }

  toggleStep(id: string): void {
    this.expandedStepIds.update(ids => BuiSelectHelper.toggleMultiple(ids, id));
  }

  openPreview(file: BuiFileDiffView, event: Event): void {
    const anchor = event.currentTarget instanceof Element ? event.currentTarget.closest(`.${BUI_TOOL_CHIPS_FILE_CLASS}`) : null;
    const view = this.document.defaultView;
    const popover = this.previewElement().nativeElement;
    if (!anchor || !view || typeof popover.showPopover !== 'function') return;

    const rect = anchor.getBoundingClientRect();
    const { width, margin, offset, headerHeight, lineHeight } = BUI_DIFF_PREVIEW;
    const fitsBelow = rect.bottom + offset + headerHeight + file.lines.length * lineHeight <= view.innerHeight - margin;
    this.preview.set({
      file,
      left: Math.max(margin, Math.min(rect.left, view.innerWidth - width - margin)),
      top: fitsBelow ? rect.bottom + offset : null,
      bottom: fitsBelow ? null : view.innerHeight - rect.top + offset
    });
    if (!popover.matches(BUI_POPOVER_OPEN_SELECTOR)) popover.showPopover();
  }

  closePreview(fileName: string): void {
    if (this.preview()?.file.file !== fileName) return;

    const popover = this.previewElement().nativeElement;
    if (typeof popover.hidePopover === 'function' && popover.matches(BUI_POPOVER_OPEN_SELECTOR)) popover.hidePopover();
    this.preview.set(null);
  }
}
