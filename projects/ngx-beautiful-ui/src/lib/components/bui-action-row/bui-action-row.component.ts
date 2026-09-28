import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';
import { BUI_ICON_SIZE } from '../../common/bui.constants';
import { BuiAction } from '../../common/bui.types';

@Component({
  selector: 'bui-action-row',
  imports: [BuiIconComponent],
  templateUrl: './bui-action-row.component.html',
  styleUrl: './bui-action-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiActionRowComponent {
  readonly actions = input<BuiAction[]>([]);
  readonly timestamp = input<string | null>('');
  readonly visible = input(true);
  readonly actionClicked = output<string>();

  protected readonly iconSize = BUI_ICON_SIZE;
}
