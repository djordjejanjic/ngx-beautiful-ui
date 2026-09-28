import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BUI_ICON_SIZE } from '../../common/bui.constants';

@Component({
  selector: 'bui-icon',
  templateUrl: './bui-icon.component.html',
  styleUrl: './bui-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiIconComponent {
  readonly src = input.required<string>();
  readonly size = input<string>(BUI_ICON_SIZE.lg);

  readonly mask = computed(() => `url("${this.src()}")`);
}
