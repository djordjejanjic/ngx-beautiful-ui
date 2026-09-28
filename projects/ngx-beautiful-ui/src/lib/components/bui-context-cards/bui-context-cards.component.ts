import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BUI_ICON_SIZE, BUI_ICONS, BUI_LABELS } from '../../common/bui.constants';
import { BuiContextChunk } from '../../common/bui.types';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';

@Component({
  selector: 'bui-context-cards',
  imports: [NgTemplateOutlet, BuiIconComponent],
  templateUrl: './bui-context-cards.component.html',
  styleUrl: './bui-context-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiContextCardsComponent {
  readonly chunks = input<BuiContextChunk[]>([]);
  readonly heading = input<string>(BUI_LABELS.contextHeading);
  readonly count = input<string | number | null>(null);

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;
}
