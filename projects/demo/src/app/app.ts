import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  BuiActionRowComponent,
  BuiApprovalAnswers,
  BuiApprovalCardComponent,
  BuiButtonComponent,
  BuiChipSelectComponent,
  BuiCodeBlockComponent,
  BuiContextCardsComponent,
  BuiDataTableComponent,
  BuiEntityChipComponent,
  BuiGlideMenuComponent,
  BuiLoadingStateComponent,
  BuiMarkdownComponent,
  BuiPromptBarComponent,
  BuiRecommendation,
  BuiRecommendationCardComponent,
  BuiShimmerComponent,
  BuiSourceChipComponent,
  BuiSourceListComponent,
  BuiStreamTextComponent,
  BuiSuggestionChipsComponent,
  BuiTaskRowsComponent,
  BuiThinkingStateComponent,
  BuiToolChipsComponent,
  BuiUserBubbleComponent,
  BuiValuePillComponent
} from 'ngx-beautiful-ui';
import {
  DEMO_AGENT_COPY,
  DEMO_APPROVAL_QUESTIONS,
  DEMO_ASSISTANT_ACTIONS,
  DEMO_BUTTON_SIZES,
  DEMO_BUTTON_VARIANTS,
  DEMO_CHIP_OPTIONS,
  DEMO_CODE_DIFF,
  DEMO_CODE_LINES,
  DEMO_COMPOSER_MENU,
  DEMO_CONTEXT_CHUNKS,
  DEMO_COPY,
  DEMO_ENTITIES,
  DEMO_LINKS,
  DEMO_MENU_ICON_SIZE,
  DEMO_MENU_ITEMS,
  DEMO_RECOMMENDATION_FALLBACK,
  DEMO_REPLY,
  DEMO_SOURCES,
  DEMO_SUGGESTIONS,
  DEMO_TABLE,
  DEMO_TIME_FORMAT,
  DEMO_TONES,
  DEMO_USER_ACTIONS
} from './common/demo.constants';
import { DemoAgentService } from './services/demo-agent.service';
import { DemoChatService } from './services/demo-chat.service';

@Component({
  selector: 'demo-root',
  imports: [
    DatePipe,
    FormField,
    BuiActionRowComponent,
    BuiApprovalCardComponent,
    BuiButtonComponent,
    BuiChipSelectComponent,
    BuiCodeBlockComponent,
    BuiContextCardsComponent,
    BuiDataTableComponent,
    BuiEntityChipComponent,
    BuiGlideMenuComponent,
    BuiLoadingStateComponent,
    BuiMarkdownComponent,
    BuiPromptBarComponent,
    BuiRecommendationCardComponent,
    BuiShimmerComponent,
    BuiSourceChipComponent,
    BuiSourceListComponent,
    BuiStreamTextComponent,
    BuiSuggestionChipsComponent,
    BuiTaskRowsComponent,
    BuiThinkingStateComponent,
    BuiToolChipsComponent,
    BuiUserBubbleComponent,
    BuiValuePillComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly chat = inject(DemoChatService);
  protected readonly agent = inject(DemoAgentService);

  private readonly draftModel = signal({ text: '' });
  protected readonly draft = form(this.draftModel);

  private readonly preferencesModel = signal({ tone: ['concise'] });
  protected readonly preferences = form(this.preferencesModel);
  protected readonly selectedTone = computed(() => this.preferencesModel().tone.join(', ') || DEMO_COPY.noneSelected);

  protected readonly pickedMenuItem = signal<string>(DEMO_COPY.menuPlaceholder);
  protected readonly thinkingExpanded = signal(false);

  protected readonly approvalVisible = signal(true);
  private readonly approvalAnswers = signal<BuiApprovalAnswers | null>(null);
  protected readonly approvalSummary = computed(() => {
    const answers = this.approvalAnswers();
    if (!answers) return DEMO_AGENT_COPY.approvalWaiting;

    return Object.values(answers)
      .map(answer => [...answer.selected, answer.custom].filter(Boolean).join(', ') || DEMO_AGENT_COPY.answerEmpty)
      .join(DEMO_AGENT_COPY.answerSeparator);
  });

  private readonly publishBody = viewChild<TemplateRef<unknown>>('publishBody');
  private readonly candidateBody = viewChild<TemplateRef<unknown>>('candidateBody');
  protected readonly recommendations = computed<BuiRecommendation[]>(() => [
    {
      id: 'publish',
      body: this.publishBody() ?? '',
      summary: 'Publish 0.2.0 to npm',
      signal: 3,
      tone: 'success',
      label: 'High confidence',
      cta: 'Publish',
      ctaVariant: 'accent'
    },
    {
      id: 'candidate',
      body: this.candidateBody() ?? '',
      summary: 'Ship a release candidate first',
      signal: 2,
      tone: 'warning',
      label: 'Needs review',
      cta: 'Configure',
      ctaVariant: 'primary'
    },
    {
      id: 'hold',
      body: DEMO_RECOMMENDATION_FALLBACK,
      summary: 'Hold until the dark theme lands',
      signal: 0,
      tone: 'neutral',
      label: 'No signal',
      cta: 'Hold release',
      ctaVariant: 'primary'
    }
  ]);

  protected readonly links = DEMO_LINKS;
  protected readonly copy = DEMO_COPY;
  protected readonly agentCopy = DEMO_AGENT_COPY;
  protected readonly timeFormat = DEMO_TIME_FORMAT;
  protected readonly suggestions = DEMO_SUGGESTIONS;
  protected readonly composerMenu = DEMO_COMPOSER_MENU;
  protected readonly userActions = DEMO_USER_ACTIONS;
  protected readonly assistantActions = DEMO_ASSISTANT_ACTIONS;
  protected readonly menuItems = DEMO_MENU_ITEMS;
  protected readonly menuIconSize = DEMO_MENU_ICON_SIZE;
  protected readonly chipOptions = DEMO_CHIP_OPTIONS;
  protected readonly buttonVariants = DEMO_BUTTON_VARIANTS;
  protected readonly buttonSizes = DEMO_BUTTON_SIZES;
  protected readonly table = DEMO_TABLE;
  protected readonly sampleMarkdown = DEMO_REPLY;
  protected readonly approvalQuestions = DEMO_APPROVAL_QUESTIONS;
  protected readonly contextChunks = DEMO_CONTEXT_CHUNKS;
  protected readonly sources = DEMO_SOURCES;
  protected readonly codeLines = DEMO_CODE_LINES;
  protected readonly codeDiff = DEMO_CODE_DIFF;
  protected readonly tones = DEMO_TONES;
  protected readonly entities = DEMO_ENTITIES;

  protected pickMenuItem(id: string): void {
    this.pickedMenuItem.set(this.menuItems.find(item => item.id === id)?.label ?? DEMO_COPY.menuPlaceholder);
  }

  protected submitApproval(answers: BuiApprovalAnswers): void {
    this.approvalAnswers.set(answers);
  }

  protected showApproval(): void {
    this.approvalAnswers.set(null);
    this.approvalVisible.set(true);
  }
}
