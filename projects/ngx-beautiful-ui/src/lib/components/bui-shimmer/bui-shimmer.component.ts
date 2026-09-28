import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bui-shimmer',
  templateUrl: './bui-shimmer.component.html',
  styleUrl: './bui-shimmer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bui-shimmer',
    '[class.bui-shimmer--fast]': 'fast()'
  }
})
export class BuiShimmerComponent {
  readonly fast = input(false);
}
