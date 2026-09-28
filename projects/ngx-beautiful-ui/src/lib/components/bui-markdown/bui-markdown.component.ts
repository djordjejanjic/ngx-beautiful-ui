import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { BuiMarkdownHelper } from '../../helpers/bui-markdown.helper';
import { BuiDataTableComponent } from '../bui-data-table/bui-data-table.component';

@Component({
  selector: 'bui-markdown',
  imports: [BuiDataTableComponent],
  templateUrl: './bui-markdown.component.html',
  styleUrl: './bui-markdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiMarkdownComponent {
  private readonly document = inject(DOCUMENT);

  readonly markdown = input('');
  readonly streaming = input(false);
  readonly linkActivated = output<string>();

  readonly segments = computed(() => BuiMarkdownHelper.toSegments(this.markdown()));

  onClick(event: MouseEvent): void {
    const path = BuiMarkdownHelper.resolveLink(event, this.document.location.origin);
    if (!path) return;

    event.preventDefault();
    this.linkActivated.emit(path);
  }
}
