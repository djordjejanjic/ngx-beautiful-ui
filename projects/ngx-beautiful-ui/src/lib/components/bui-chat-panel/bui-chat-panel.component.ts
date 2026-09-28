import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { BUI_ICON_SIZE } from '../../common/bui.constants';
import { BuiAction, BuiChatTab } from '../../common/bui.types';
import { BuiStickToBottomDirective } from '../../directives/bui-stick-to-bottom.directive';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';

@Component({
  selector: 'bui-chat-panel',
  imports: [BuiIconComponent, BuiStickToBottomDirective],
  templateUrl: './bui-chat-panel.component.html',
  styleUrl: './bui-chat-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiChatPanelComponent {
  readonly tabs = input<BuiChatTab[]>([]);
  readonly actions = input<BuiAction[]>([]);
  readonly stickToBottom = input(true);
  readonly activeTab = model<string | null>(null);
  readonly actionClicked = output<string>();

  protected readonly iconSize = BUI_ICON_SIZE;

  readonly hasHeader = computed(() => this.tabs().length > 0 || this.actions().length > 0);
  readonly currentTab = computed(() => this.activeTab() ?? this.tabs()[0]?.id ?? null);

  selectTab(id: string): void {
    this.activeTab.set(id);
  }
}
