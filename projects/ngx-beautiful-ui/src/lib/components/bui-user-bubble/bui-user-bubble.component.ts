import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bui-user-bubble',
  templateUrl: './bui-user-bubble.component.html',
  styleUrl: './bui-user-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiUserBubbleComponent {
  readonly timestamp = input<string | null>('');
}
