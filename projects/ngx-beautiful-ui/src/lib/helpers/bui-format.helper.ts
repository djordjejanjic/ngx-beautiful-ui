import {
  BUI_ELAPSED_TICK_MS,
  BUI_LABELS,
  BUI_LOW_SURROGATE_RANGE,
  BUI_MS_PER_SECOND,
  BUI_SECONDS_PER_MINUTE
} from '../common/bui.constants';
import { BuiTextSplit } from '../common/bui.types';

export class BuiFormatHelper {
  static formatElapsed(elapsedMs: number): string {
    const ticks = Math.max(0, Math.floor(elapsedMs / BUI_ELAPSED_TICK_MS));
    const totalSeconds = (ticks * BUI_ELAPSED_TICK_MS) / BUI_MS_PER_SECOND;
    if (totalSeconds < BUI_SECONDS_PER_MINUTE) return `${totalSeconds.toFixed(1)}s`;

    const minutes = Math.floor(totalSeconds / BUI_SECONDS_PER_MINUTE);
    return `${minutes}m ${(totalSeconds % BUI_SECONDS_PER_MINUTE).toFixed(1)}s`;
  }

  static formatThoughtDuration(durationMs: number | null | undefined): string {
    if (durationMs === null || durationMs === undefined || durationMs < 0) return BUI_LABELS.thoughtFallback;

    const seconds = Math.max(1, Math.round(durationMs / BUI_MS_PER_SECOND));
    return `${BUI_LABELS.thoughtFor} ${seconds} ${seconds === 1 ? BUI_LABELS.second : BUI_LABELS.seconds}`;
  }

  static splitTail(text: string, count: number): BuiTextSplit {
    let index = text.length;
    for (let taken = 0; taken < count && index > 0; taken++) {
      index -= index > 1 && BuiFormatHelper.isLowSurrogate(text.charCodeAt(index - 1)) ? 2 : 1;
    }
    return { head: text.slice(0, index), tail: text.slice(index) };
  }

  private static isLowSurrogate(charCode: number): boolean {
    return charCode >= BUI_LOW_SURROGATE_RANGE.min && charCode <= BUI_LOW_SURROGATE_RANGE.max;
  }
}
