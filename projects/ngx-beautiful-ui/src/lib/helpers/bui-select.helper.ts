export class BuiSelectHelper {
  static toggleMultiple<T>(current: readonly T[], value: T): T[] {
    return current.includes(value) ? current.filter(selected => selected !== value) : [...current, value];
  }

  static toggleSingle<T>(current: T | null, value: T): T | null {
    return current === value ? null : value;
  }
}
