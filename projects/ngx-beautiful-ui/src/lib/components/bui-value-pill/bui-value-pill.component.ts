import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BuiTone } from '../../common/bui.types';

@Component({
  selector: 'bui-value-pill',
  templateUrl: './bui-value-pill.component.html',
  styleUrl: './bui-value-pill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bui-value-pill',
    '[attr.data-tone]': 'tone()'
  }
})
export class BuiValuePillComponent {
  readonly tone = input<BuiTone>('neutral');
}
