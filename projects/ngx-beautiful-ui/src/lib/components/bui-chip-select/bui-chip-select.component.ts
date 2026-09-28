import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { BuiSelectHelper } from '../../helpers/bui-select.helper';
import { BuiChipOption, BuiChipView } from '../../common/bui.types';

@Component({
  selector: 'bui-chip-select',
  templateUrl: './bui-chip-select.component.html',
  styleUrl: './bui-chip-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiChipSelectComponent implements FormValueControl<string[]> {
  readonly value = model<string[]>([]);
  readonly touched = model(false);
  readonly disabled = input(false);
  readonly invalid = input(false);
  readonly options = input<BuiChipOption[]>([]);
  readonly multiple = input(true);
  readonly ariaLabel = input<string | null>(null);

  readonly chips = computed<BuiChipView[]>(() => {
    const selected = this.value() ?? [];
    return this.options().map(option => ({ ...option, selected: selected.includes(option.value) }));
  });

  toggle(chip: BuiChipView): void {
    if (this.disabled() || chip.disabled) return;

    this.markTouched();
    const current = this.value() ?? [];
    if (this.multiple()) {
      this.value.set(BuiSelectHelper.toggleMultiple(current, chip.value));
      return;
    }

    const next = BuiSelectHelper.toggleSingle(current[0] ?? null, chip.value);
    this.value.set(next === null ? [] : [next]);
  }

  markTouched(): void {
    this.touched.set(true);
  }
}
