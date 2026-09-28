import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { BUI_ICON_SIZE, BUI_ICONS, BUI_LABELS } from '../../common/bui.constants';
import { BuiTask, BuiTaskLayout, BuiTaskView } from '../../common/bui.types';
import { BuiSelectHelper } from '../../helpers/bui-select.helper';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';

@Component({
  selector: 'bui-task-rows',
  imports: [BuiIconComponent],
  templateUrl: './bui-task-rows.component.html',
  styleUrl: './bui-task-rows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiTaskRowsComponent {
  readonly tasks = input<BuiTask[]>([]);
  readonly layout = input<BuiTaskLayout>('capsules');
  readonly completedLabel = input<string>(BUI_LABELS.completed);
  readonly failedLabel = input<string>(BUI_LABELS.failed);
  readonly expandedIds = model<string[]>([]);

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;

  readonly views = computed<BuiTaskView[]>(() => {
    const expanded = this.expandedIds();
    return this.tasks().map(task => ({ ...task, expanded: expanded.includes(task.id), details: task.details ?? [] }));
  });

  toggle(id: string): void {
    this.expandedIds.update(ids => BuiSelectHelper.toggleMultiple(ids, id));
  }
}
