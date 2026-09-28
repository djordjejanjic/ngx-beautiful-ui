import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BUI_LABELS } from '../../common/bui.constants';

@Component({
  selector: 'bui-reply-step',
  templateUrl: './bui-reply-step.component.html',
  styleUrl: './bui-reply-step.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiReplyStepComponent {
  readonly label = input.required<string>();
  readonly subtitle = input('');
  readonly duration = input('');
  readonly durationPrefix = input<string>(BUI_LABELS.stepDurationPrefix);
  readonly resolving = input(false);
}
