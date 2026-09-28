import { BUI_ICON_SIZE, BUI_ICONS, BuiAction, BuiButtonSize, BuiButtonVariant, BuiChipOption, BuiMenuItem } from 'ngx-beautiful-ui';
import { DemoTable } from './demo.types';

export const DEMO_LINKS = {
  repository: 'https://github.com/djordjejanjic/ngx-beautiful-ui',
  upstream: 'https://github.com/slev12397/beautiful-ui',
  site: 'https://www.beautifului.dev'
} as const;

export const DEMO_TIMING = {
  loadingMs: 900,
  thinkingMs: 1600,
  streamTickMs: 24,
  streamChunk: 3,
  uploadMs: 900
} as const;

export const DEMO_TIME_FORMAT = 'HH:mm';

export const DEMO_COPY = {
  suggestionsHeading: 'Try asking',
  thinkingTrace:
    'The user wants a quick comparison of the three layout approaches. I should cover trade-offs, keep it scannable and end with a recommendation.',
  stoppedReply: '_Response stopped._',
  attachmentFallback: 'Attachment',
  noneSelected: 'none',
  menuPlaceholder: 'Pick an item from the menu',
  streamSample: 'Streaming text reveals each new token with a soft, blurred tail',
  shimmerSample: 'Generating summary',
  loadingSample: 'Searching the docs',
  thinkingDoneLabel: null
} as const;

export const DEMO_REPLY = `### Layout options at a glance

Here is how the three approaches compare for a **chat-style interface**:

| Approach | Best for | Complexity |
| :-- | :-- | --: |
| CSS Grid | Two-dimensional layouts | Low |
| Flexbox | Rows and columns of items | Low |
| Container queries | Components that adapt to their slot | Medium |

A few things worth keeping in mind:

1. Grid handles the page shell, while flexbox works well inside each message.
2. Container queries let the composer adapt when it sits in a narrow side panel.
3. Keep the scroll container separate from the composer so the input never moves.

> Start simple: a grid shell with flexbox inside covers most chat layouts.

Read more in the [MDN layout guide](https://developer.mozilla.org/docs/Learn_web_development/Core/CSS_layout), or try it with \`display: grid\`.`;

export const DEMO_SUGGESTIONS: string[] = [
  'Compare CSS Grid, Flexbox and container queries',
  'Explain signals in one paragraph',
  'Draft a short release note for version 0.1.0'
];

export const DEMO_ATTACHMENT_NAMES: Readonly<Record<string, string>> = {
  file: 'design-brief.pdf',
  image: 'wireframe.png'
};

export const DEMO_COMPOSER_MENU: BuiMenuItem[] = [
  { id: 'file', label: 'Attach file', description: 'PDF, DOCX, TXT', icon: BUI_ICONS.paperclip },
  { id: 'image', label: 'Attach image', description: 'PNG, JPG', icon: BUI_ICONS.image }
];

export const DEMO_USER_ACTIONS: BuiAction[] = [
  { id: 'edit', icon: BUI_ICONS.pencil, label: 'Edit' },
  { id: 'copy', icon: BUI_ICONS.copy, label: 'Copy' }
];

export const DEMO_ASSISTANT_ACTIONS: BuiAction[] = [
  { id: 'copy', icon: BUI_ICONS.copy, label: 'Copy' },
  { id: 'good', icon: BUI_ICONS.thumbUp, label: 'Good response' },
  { id: 'bad', icon: BUI_ICONS.thumbDown, label: 'Bad response' },
  { id: 'retry', icon: BUI_ICONS.retry, label: 'Regenerate' }
];

export const DEMO_MENU_ITEMS: BuiMenuItem[] = [
  { id: 'rename', label: 'Rename', icon: BUI_ICONS.pencil },
  { id: 'duplicate', label: 'Duplicate', icon: BUI_ICONS.copy },
  { id: 'archive', label: 'Archive', icon: BUI_ICONS.file, disabled: true },
  { id: 'delete', label: 'Delete', icon: BUI_ICONS.trash, tone: 'danger' }
];

export const DEMO_MENU_ICON_SIZE = BUI_ICON_SIZE.md;

export const DEMO_CHIP_OPTIONS: BuiChipOption[] = [
  { value: 'concise', label: 'Concise' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'playful', label: 'Playful', disabled: true }
];

export const DEMO_BUTTON_VARIANTS: BuiButtonVariant[] = ['primary', 'secondary', 'ghost', 'accent', 'quiet'];

export const DEMO_BUTTON_SIZES: BuiButtonSize[] = ['xs', 'sm', 'md'];

export const DEMO_TABLE: DemoTable = {
  header: ['Component', 'Selector', 'Signal forms'],
  align: ['left', 'left', 'center'],
  rows: [
    ['Prompt bar', '<code>bui-prompt-bar</code>', 'Yes'],
    ['Chip select', '<code>bui-chip-select</code>', 'Yes'],
    ['Markdown', '<code>bui-markdown</code>', 'No'],
    ['Glide menu', '<code>bui-glide-menu</code>', 'No']
  ]
};
