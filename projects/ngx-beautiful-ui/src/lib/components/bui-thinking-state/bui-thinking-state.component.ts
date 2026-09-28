import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';
import { BUI_ICON_SIZE, BUI_ICONS, BUI_LABELS } from '../../common/bui.constants';
import { BuiFormatHelper } from '../../helpers/bui-format.helper';
import { BuiShimmerComponent } from '../bui-shimmer/bui-shimmer.component';

@Component({
  selector: 'bui-thinking-state',
  imports: [BuiShimmerComponent, BuiIconComponent],
  templateUrl: './bui-thinking-state.component.html',
  styleUrl: './bui-thinking-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiThinkingStateComponent {
  readonly working = input(false);
  readonly durationMs = input<number | null>(null);
  readonly label = input<string>(BUI_LABELS.thinking);
  readonly doneLabel = input<string | null>(null);
  readonly expanded = model(false);

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;

  readonly doneText = computed(() => this.doneLabel() ?? BuiFormatHelper.formatThoughtDuration(this.durationMs()));

  toggle(): void {
    this.expanded.update(expanded => !expanded);
  }
}
