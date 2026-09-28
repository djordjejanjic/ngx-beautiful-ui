import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BUI_SIGNAL_METER_BARS } from '../../common/bui.constants';
import { BuiTone } from '../../common/bui.types';

@Component({
  selector: 'bui-signal-meter',
  templateUrl: './bui-signal-meter.component.html',
  styleUrl: './bui-signal-meter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bui-signal-meter',
    'aria-hidden': 'true',
    '[attr.data-tone]': 'tone()'
  }
})
export class BuiSignalMeterComponent {
  readonly level = input(0);
  readonly tone = input<BuiTone>('neutral');

  readonly bars = computed(() => Array.from({ length: BUI_SIGNAL_METER_BARS }, (_, bar) => bar < this.level()));
}
