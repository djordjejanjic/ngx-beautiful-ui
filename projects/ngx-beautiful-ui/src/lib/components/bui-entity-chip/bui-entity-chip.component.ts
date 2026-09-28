import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'bui-entity-chip',
  templateUrl: './bui-entity-chip.component.html',
  styleUrl: './bui-entity-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bui-entity-chip'
  }
})
export class BuiEntityChipComponent {
  readonly name = input.required<string>();
  readonly color = input<string | null>(null);
  readonly monogram = input<string | null>(null);

  readonly initial = computed(() => this.monogram() ?? this.name().charAt(0));
}
