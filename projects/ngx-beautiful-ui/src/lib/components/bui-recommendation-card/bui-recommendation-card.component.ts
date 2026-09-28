import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output, signal, TemplateRef } from '@angular/core';
import { BUI_LABELS } from '../../common/bui.constants';
import { BuiRecommendation, BuiRecommendationView } from '../../common/bui.types';
import { BuiButtonComponent } from '../bui-button/bui-button.component';
import { BuiSignalMeterComponent } from '../bui-signal-meter/bui-signal-meter.component';

@Component({
  selector: 'bui-recommendation-card',
  imports: [NgTemplateOutlet, BuiButtonComponent, BuiSignalMeterComponent],
  templateUrl: './bui-recommendation-card.component.html',
  styleUrl: './bui-recommendation-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiRecommendationCardComponent {
  readonly heading = input('');
  readonly options = input<BuiRecommendation[]>([]);
  readonly alternativesLabel = input<string>(BUI_LABELS.alternatives);
  readonly otherOptionsLabel = input<string>(BUI_LABELS.otherOptions);
  readonly acceptedLabel = input<string>(BUI_LABELS.accepted);
  readonly selectedId = model<string | null>(null);
  readonly accepted = output<string>();

  readonly alternativesOpen = signal(false);

  readonly views = computed<BuiRecommendationView[]>(() =>
    this.options().map(option => ({
      ...option,
      text: typeof option.body === 'string' ? option.body : '',
      template: option.body instanceof TemplateRef ? option.body : null
    }))
  );

  readonly active = computed(() => this.views().find(option => option.id === this.selectedId()) ?? this.views()[0] ?? null);
  readonly activeKeys = computed(() => {
    const active = this.active();
    return active ? [active] : [];
  });
  readonly others = computed(() => this.views().filter(option => option.id !== this.active()?.id));

  readonly isAccepted = linkedSignal({
    source: () => this.active()?.id,
    computation: () => false
  });

  toggleAlternatives(): void {
    this.alternativesOpen.update(open => !open);
  }

  select(id: string): void {
    this.selectedId.set(id);
  }

  accept(): void {
    const active = this.active();
    if (!active) return;

    this.isAccepted.set(true);
    this.accepted.emit(active.id);
  }
}
