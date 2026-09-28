import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BuiSource } from '../../common/bui.types';

@Component({
  selector: 'bui-source-chip',
  templateUrl: './bui-source-chip.component.html',
  styleUrl: './bui-source-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiSourceChipComponent {
  readonly source = input.required<BuiSource>();
}
