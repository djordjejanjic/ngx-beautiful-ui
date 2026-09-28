import { BUI_MENU_NAVIGATION_STEPS } from '../common/bui.constants';
import { BuiMenuItem } from '../common/bui.types';

export class BuiMenuHelper {
  static navigationStep(key: string): number | null {
    return BUI_MENU_NAVIGATION_STEPS[key] ?? null;
  }

  static nextEnabledIndex(items: BuiMenuItem[], current: number | null, step: number): number | null {
    const count = items.length;
    let index = current ?? (step > 0 ? -1 : count);
    for (let attempt = 0; attempt < count; attempt++) {
      index = (index + step + count) % count;
      if (!items[index].disabled) return index;
    }
    return null;
  }
}
