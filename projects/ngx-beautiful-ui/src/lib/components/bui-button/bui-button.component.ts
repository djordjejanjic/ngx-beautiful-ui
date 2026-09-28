import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BuiButtonSize, BuiButtonType, BuiButtonVariant } from '../../common/bui.types';

@Component({
  selector: 'bui-button',
  templateUrl: './bui-button.component.html',
  styleUrl: './bui-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.bui-button-host--full-width]': 'fullWidth()'
  }
})
export class BuiButtonComponent {
  readonly variant = input<BuiButtonVariant>('secondary');
  readonly size = input<BuiButtonSize>('md');
  readonly type = input<BuiButtonType>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly ariaLabel = input<string | null>(null);
  readonly ariaExpanded = input<boolean | null>(null);
  readonly ariaPressed = input<boolean | null>(null);
  readonly clicked = output<MouseEvent>();
}
