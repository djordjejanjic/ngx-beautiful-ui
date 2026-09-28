import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BUI_STREAM_TAIL_LENGTH } from '../../common/bui.constants';
import { BuiTextSplit } from '../../common/bui.types';
import { BuiFormatHelper } from '../../helpers/bui-format.helper';

@Component({
  selector: 'bui-stream-text',
  templateUrl: './bui-stream-text.component.html',
  styleUrl: './bui-stream-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiStreamTextComponent {
  readonly text = input('');
  readonly streaming = input(false);
  readonly caret = input(true);

  readonly parts = computed<BuiTextSplit>(() =>
    this.streaming() ? BuiFormatHelper.splitTail(this.text(), BUI_STREAM_TAIL_LENGTH) : { head: this.text(), tail: '' }
  );
}
