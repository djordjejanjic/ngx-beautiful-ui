import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  BuiActionRowComponent,
  BuiButtonComponent,
  BuiChipSelectComponent,
  BuiDataTableComponent,
  BuiGlideMenuComponent,
  BuiLoadingStateComponent,
  BuiMarkdownComponent,
  BuiPromptBarComponent,
  BuiShimmerComponent,
  BuiStreamTextComponent,
  BuiSuggestionChipsComponent,
  BuiThinkingStateComponent,
  BuiUserBubbleComponent
} from 'ngx-beautiful-ui';
import {
  DEMO_ASSISTANT_ACTIONS,
  DEMO_BUTTON_SIZES,
  DEMO_BUTTON_VARIANTS,
  DEMO_CHIP_OPTIONS,
  DEMO_COMPOSER_MENU,
  DEMO_COPY,
  DEMO_LINKS,
  DEMO_MENU_ICON_SIZE,
  DEMO_MENU_ITEMS,
  DEMO_REPLY,
  DEMO_SUGGESTIONS,
  DEMO_TABLE,
  DEMO_TIME_FORMAT,
  DEMO_USER_ACTIONS
} from './common/demo.constants';
import { DemoChatService } from './services/demo-chat.service';

@Component({
  selector: 'demo-root',
  imports: [
    DatePipe,
    FormField,
    BuiActionRowComponent,
    BuiButtonComponent,
    BuiChipSelectComponent,
    BuiDataTableComponent,
    BuiGlideMenuComponent,
    BuiLoadingStateComponent,
    BuiMarkdownComponent,
    BuiPromptBarComponent,
    BuiShimmerComponent,
    BuiStreamTextComponent,
    BuiSuggestionChipsComponent,
    BuiThinkingStateComponent,
    BuiUserBubbleComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly chat = inject(DemoChatService);

  private readonly draftModel = signal({ text: '' });
  protected readonly draft = form(this.draftModel);

  private readonly preferencesModel = signal({ tone: ['concise'] });
  protected readonly preferences = form(this.preferencesModel);
  protected readonly selectedTone = computed(() => this.preferencesModel().tone.join(', ') || DEMO_COPY.noneSelected);

  protected readonly pickedMenuItem = signal<string>(DEMO_COPY.menuPlaceholder);
  protected readonly thinkingExpanded = signal(false);

  protected readonly links = DEMO_LINKS;
  protected readonly copy = DEMO_COPY;
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

  protected pickMenuItem(id: string): void {
    this.pickedMenuItem.set(this.menuItems.find(item => item.id === id)?.label ?? DEMO_COPY.menuPlaceholder);
  }
}
