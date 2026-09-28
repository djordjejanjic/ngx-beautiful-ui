import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';
import { BUI_ICON_SIZE, BUI_ICONS } from '../../common/bui.constants';

@Component({
  selector: 'bui-suggestion-chips',
  imports: [BuiIconComponent],
  templateUrl: './bui-suggestion-chips.component.html',
  styleUrl: './bui-suggestion-chips.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiSuggestionChipsComponent {
  readonly suggestions = input<string[]>([]);
  readonly heading = input('');
  readonly visible = input(true);
  readonly disabled = input(false);
  readonly suggestionSelected = output<string>();

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;
}
