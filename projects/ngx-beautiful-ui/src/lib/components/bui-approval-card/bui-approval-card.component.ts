import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, linkedSignal, output, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import {
  BUI_APPROVAL_ADVANCE_MS,
  BUI_APPROVAL_DIRECTION,
  BUI_APPROVAL_STATUS,
  BUI_APPROVAL_TYPE,
  BUI_ICON_SIZE,
  BUI_ICONS,
  BUI_LABELS
} from '../../common/bui.constants';
import {
  BuiApprovalAnswers,
  BuiApprovalDirection,
  BuiApprovalOptionView,
  BuiApprovalQuestion,
  BuiApprovalStatus
} from '../../common/bui.types';
import { BuiSelectHelper } from '../../helpers/bui-select.helper';
import { BuiButtonComponent } from '../bui-button/bui-button.component';
import { BuiIconComponent } from '../bui-icon/bui-icon.component';

@Component({
  selector: 'bui-approval-card',
  imports: [BuiButtonComponent, BuiIconComponent],
  templateUrl: './bui-approval-card.component.html',
  styleUrl: './bui-approval-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuiApprovalCardComponent {
  private autoAdvance: Subscription | null = null;

  readonly questions = input<BuiApprovalQuestion[]>([]);
  readonly allowCustom = input(true);
  readonly resettable = input(true);
  readonly skipLabel = input<string>(BUI_LABELS.skip);
  readonly continueLabel = input<string>(BUI_LABELS.continue);
  readonly sendLabel = input<string>(BUI_LABELS.sendAnswers);
  readonly customPlaceholder = input<string>(BUI_LABELS.customAnswerPlaceholder);
  readonly customAnswerLabel = input<string>(BUI_LABELS.customAnswer);
  readonly sentLabel = input<string>(BUI_LABELS.answersSent);
  readonly startOverLabel = input<string>(BUI_LABELS.startOver);
  readonly dismissLabel = input<string>(BUI_LABELS.dismiss);
  readonly previousLabel = input<string>(BUI_LABELS.previousQuestion);
  readonly nextLabel = input<string>(BUI_LABELS.nextQuestion);
  readonly submitted = output<BuiApprovalAnswers>();
  readonly dismissed = output<void>();

  protected readonly icons = BUI_ICONS;
  protected readonly iconSize = BUI_ICON_SIZE;
  protected readonly statuses = BUI_APPROVAL_STATUS;
  protected readonly types = BUI_APPROVAL_TYPE;
  protected readonly directions = BUI_APPROVAL_DIRECTION;

  readonly index = linkedSignal({ source: this.questions, computation: () => 0 });
  readonly answers = linkedSignal<BuiApprovalQuestion[], Record<string, string[]>>({ source: this.questions, computation: () => ({}) });
  readonly custom = linkedSignal<BuiApprovalQuestion[], Record<string, string>>({ source: this.questions, computation: () => ({}) });
  readonly status = linkedSignal<BuiApprovalQuestion[], BuiApprovalStatus>({
    source: this.questions,
    computation: () => BUI_APPROVAL_STATUS.open
  });
  readonly direction = signal<BuiApprovalDirection>(BUI_APPROVAL_DIRECTION.forward);

  readonly active = computed<BuiApprovalQuestion | null>(() => this.questions()[this.index()] ?? null);
  readonly activeList = computed(() => {
    const active = this.active();
    return active ? [active] : [];
  });
  readonly isLast = computed(() => this.index() >= this.questions().length - 1);
  readonly selected = computed(() => this.answers()[this.active()?.id ?? ''] ?? []);
  readonly customText = computed(() => this.custom()[this.active()?.id ?? ''] ?? '');
  readonly hasAnswer = computed(() => this.selected().length > 0 || this.customText().trim().length > 0);
  readonly stepLabels = computed(() => [`${this.index() + 1} / ${this.questions().length}`]);
  readonly optionViews = computed<BuiApprovalOptionView[]>(() => {
    const selected = this.selected();
    return (this.active()?.options ?? []).map(label => ({ label, selected: selected.includes(label) }));
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => this.cancelAutoAdvance());
  }

  toggle(option: string): void {
    const question = this.active();
    if (!question) return;

    if (question.type === BUI_APPROVAL_TYPE.single) {
      this.answers.update(answers => ({ ...answers, [question.id]: [option] }));
      this.custom.update(custom => ({ ...custom, [question.id]: '' }));
      this.cancelAutoAdvance();
      this.autoAdvance = timer(BUI_APPROVAL_ADVANCE_MS).subscribe(() => this.advance());
      return;
    }

    this.answers.update(answers => ({ ...answers, [question.id]: BuiSelectHelper.toggleMultiple(answers[question.id] ?? [], option) }));
  }

  setCustom(text: string): void {
    const question = this.active();
    if (!question) return;

    this.cancelAutoAdvance();
    this.custom.update(custom => ({ ...custom, [question.id]: text }));
    if (question.type === BUI_APPROVAL_TYPE.single) this.answers.update(answers => ({ ...answers, [question.id]: [] }));
  }

  submitCustom(event: Event): void {
    if (!this.hasAnswer()) return;

    event.preventDefault();
    this.advance();
  }

  goTo(next: number): void {
    const target = Math.min(Math.max(next, 0), this.questions().length - 1);
    if (target === this.index()) return;

    this.cancelAutoAdvance();
    this.direction.set(target < this.index() ? BUI_APPROVAL_DIRECTION.back : BUI_APPROVAL_DIRECTION.forward);
    this.index.set(target);
  }

  advance(): void {
    if (this.isLast()) this.send();
    else this.goTo(this.index() + 1);
  }

  skip(): void {
    if (this.isLast()) this.dismiss();
    else this.goTo(this.index() + 1);
  }

  dismiss(): void {
    this.cancelAutoAdvance();
    this.status.set(BUI_APPROVAL_STATUS.closed);
    this.dismissed.emit();
  }

  reset(): void {
    this.cancelAutoAdvance();
    this.direction.set(BUI_APPROVAL_DIRECTION.forward);
    this.index.set(0);
    this.answers.set({});
    this.custom.set({});
    this.status.set(BUI_APPROVAL_STATUS.open);
  }

  private send(): void {
    this.cancelAutoAdvance();
    const answers = this.answers();
    const custom = this.custom();
    this.status.set(BUI_APPROVAL_STATUS.sent);
    this.submitted.emit(
      Object.fromEntries(
        this.questions().map(question => [
          question.id,
          { selected: answers[question.id] ?? [], custom: (custom[question.id] ?? '').trim() }
        ])
      )
    );
  }

  private cancelAutoAdvance(): void {
    this.autoAdvance?.unsubscribe();
    this.autoAdvance = null;
  }
}
