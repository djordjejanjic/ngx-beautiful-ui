import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { BUI_LABELS } from '../../common/bui.constants';
import { BuiSource } from '../../common/bui.types';

@Component({
  selector: 'bui-source-list',
  templateUrl: './bui-source-list.component.html',
  styleUrl: './bui-source-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiSourceListComponent {
  readonly sources = input<BuiSource[]>([]);
  readonly label = input<string | null>(null);
  readonly expanded = model(false);

  readonly toggleLabel = computed(() => this.label() ?? `${this.sources().length} ${BUI_LABELS.sources}`);

  toggle(): void {
    this.expanded.update(expanded => !expanded);
  }
}
