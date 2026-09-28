import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BUI_LABELS } from '../../common/bui.constants';
import { BuiTableAlign } from '../../common/bui.types';

@Component({
  selector: 'bui-data-table',
  templateUrl: './bui-data-table.component.html',
  styleUrl: './bui-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiDataTableComponent {
  readonly header = input<string[]>([]);
  readonly align = input<BuiTableAlign[]>([]);
  readonly rows = input<string[][]>([]);
  readonly ariaLabel = input<string>(BUI_LABELS.table);
}
