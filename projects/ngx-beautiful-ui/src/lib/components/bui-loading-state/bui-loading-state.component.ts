import { ChangeDetectionStrategy, Component, computed, inject, input, NgZone } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, interval, map, Observable, switchMap } from 'rxjs';
import { BUI_ELAPSED_TICK_MS, BUI_LABELS, BUI_LOADER_CELL_DELAYS_MS } from '../../common/bui.constants';
import { BuiFormatHelper } from '../../helpers/bui-format.helper';
import { BuiShimmerComponent } from '../bui-shimmer/bui-shimmer.component';

@Component({
  selector: 'bui-loading-state',
  imports: [BuiShimmerComponent],
  templateUrl: './bui-loading-state.component.html',
  styleUrl: './bui-loading-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiLoadingStateComponent {
  private readonly ngZone = inject(NgZone);

  readonly label = input<string>(BUI_LABELS.thinking);
  readonly showElapsed = input(true);
  readonly startedAt = input<number | null>(null);

  protected readonly cellDelays = BUI_LOADER_CELL_DELAYS_MS;

  private readonly createdAt = Date.now();

  private readonly ticks = new Observable<number>(subscriber =>
    this.ngZone.runOutsideAngular(() => interval(BUI_ELAPSED_TICK_MS).subscribe(subscriber))
  );

  private readonly now = toSignal(
    toObservable(this.showElapsed).pipe(
      switchMap(showElapsed => (showElapsed ? this.ticks : EMPTY)),
      map(() => Date.now())
    ),
    { initialValue: this.createdAt }
  );

  readonly elapsed = computed(() => BuiFormatHelper.formatElapsed(this.now() - (this.startedAt() ?? this.createdAt)));
}
