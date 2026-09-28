import {
  BUI_ICON_SIZE,
  BUI_ICONS,
  BuiAction,
  BuiApprovalQuestion,
  BuiButtonSize,
  BuiButtonVariant,
  BuiChatTab,
  BuiChipOption,
  BuiContextChunk,
  BuiDiffRow,
  BuiFileDiff,
  BuiMenuItem,
  BuiSource,
  BuiTask,
  BuiTone,
  BuiToolStep
} from 'ngx-beautiful-ui';
import { DemoEntity, DemoReplyStep, DemoTable } from './demo.types';

const demoAvatar = (fill: string, shape: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${fill}"/>${shape}</svg>`)}`;

export const DEMO_AGENT_TIMING = {
  stepMs: 700,
  failMs: 2400,
  doneMs: 3800
} as const;

export const DEMO_AGENT_COPY = {
  toolHeading: '4 tool calls, 3 files',
  toolMore: '+2 more',
  replay: 'Replay',
  recommendationHeading: 'Want me to publish this release?',
  contextCount: 12,
  approvalShow: 'Show the approval card again',
  approvalDismissed: 'Approval card dismissed.',
  approvalWaiting: 'Answers appear here after you send them.',
  answerEmpty: '—',
  answerSeparator: ' · ',
  codeFile: 'format-elapsed.ts'
} as const;

export const DEMO_SEQUENCE_TASK_ID = 'docs';

export const DEMO_CHAT_TAB = {
  chat: 'chat',
  activity: 'activity'
} as const;

export const DEMO_CHAT_TABS: BuiChatTab[] = [
  { id: DEMO_CHAT_TAB.chat, label: 'Chat' },
  { id: DEMO_CHAT_TAB.activity, label: 'Activity' }
];

export const DEMO_CHAT_ACTION = {
  newChat: 'new-chat'
} as const;

export const DEMO_CHAT_ACTIONS: BuiAction[] = [{ id: DEMO_CHAT_ACTION.newChat, icon: BUI_ICONS.plus, label: 'New chat' }];

export const DEMO_REPLY_STEPS: DemoReplyStep[] = [
  {
    label: 'Search',
    subtitle: 'Layout guides',
    duration: '1.2s',
    body: 'Found three guides comparing CSS Grid, Flexbox and container queries.'
  },
  {
    label: 'Compare',
    subtitle: 'Trade-offs',
    duration: '0.8s',
    body: 'Grid fits the page shell best, with Flexbox inside each message.'
  }
];

export const DEMO_TOOL_STEPS: BuiToolStep[] = [
  {
    id: 'think',
    icon: BUI_ICONS.sparkle,
    label: 'Thinking',
    chip: 'Planning the token migration…',
    detail: [{ text: 'Colour tokens are referenced in 14 components.' }, { text: 'Spacing already follows the 2px scale, so it can stay.' }]
  },
  {
    id: 'write',
    icon: BUI_ICONS.pencil,
    label: 'Write 86 lines',
    chip: '_tokens.scss',
    mono: true,
    detailMono: true,
    detail: [
      { text: '+ --bui-warning: oklch(0.689 0.179 49.9);', tone: 'add' },
      { text: '+ --bui-warning-soft: oklch(0.964 0.021 67.6);', tone: 'add' }
    ]
  },
  {
    id: 'run',
    icon: BUI_ICONS.terminal,
    label: 'Build and verify',
    chip: 'npm run build',
    mono: true,
    detailMono: true,
    detail: [{ text: '✓ built in 1.4s' }, { text: '✓ 0 lint errors' }]
  },
  {
    id: 'read',
    icon: BUI_ICONS.file,
    label: 'Read image',
    chip: 'contrast-audit.png',
    mono: true,
    detail: [{ text: '1280 × 720 · colour contrast report.' }, { text: 'Two tokens fall below 4.5:1 on white.' }]
  }
];

export const DEMO_TOOL_FILES: BuiFileDiff[] = [
  {
    file: '_tokens.scss',
    added: 12,
    removed: 0,
    lines: [
      { text: ':root {', tone: 'ctx' },
      { text: '  --bui-warning: oklch(0.689 0.179 49.9);', tone: 'add' },
      { text: '  --bui-warning-soft: oklch(0.964 0.021 67.6);', tone: 'add' },
      { text: '}', tone: 'ctx' }
    ]
  },
  {
    file: 'task-rows.scss',
    added: 18,
    removed: 6,
    lines: [
      { text: '.bui-task-rows__row {', tone: 'ctx' },
      { text: '  border-radius: 22px;', tone: 'del' },
      { text: '  border-radius: var(--bui-task-radius);', tone: 'add' },
      { text: '}', tone: 'ctx' }
    ]
  },
  {
    file: 'README.md',
    added: 4,
    removed: 1,
    lines: [
      { text: '## Theming', tone: 'ctx' },
      { text: 'Colours are hard-coded.', tone: 'del' },
      { text: 'Every colour is a --bui-* token.', tone: 'add' }
    ]
  }
];

export const DEMO_TASKS: BuiTask[] = [
  {
    id: 'audit',
    label: 'Audit colour tokens',
    meta: '42 tokens',
    status: 'done',
    details: [
      { label: 'Matched usages across components', meta: '42/42' },
      { label: 'Flagged low-contrast pairs', meta: '2' }
    ]
  },
  {
    id: 'migrate',
    label: 'Migrate components',
    meta: '9 files',
    status: 'running',
    step: 2,
    details: [
      { label: 'Replacing hard-coded values', meta: '6 files' },
      { label: 'Rebuilding styles', meta: '68%' }
    ]
  },
  {
    id: DEMO_SEQUENCE_TASK_ID,
    label: 'Update documentation',
    meta: '2 pages',
    status: 'pending',
    step: 3,
    details: [
      { label: 'Theming guide', meta: 'draft' },
      { label: 'Migration notes', meta: 'draft' }
    ]
  }
];

export const DEMO_APPROVAL_QUESTIONS: BuiApprovalQuestion[] = [
  { id: 'theme', question: 'Which theme should ship first?', type: 'single', options: ['Light only', 'Dark only', 'Both together'] },
  {
    id: 'components',
    question: 'Which components need a dark variant?',
    type: 'multiple',
    options: ['Prompt bar', 'Markdown', 'Code block']
  },
  { id: 'release', question: 'When should we release?', type: 'single', options: ['This week', 'Next sprint', 'After review'] }
];

export const DEMO_RECOMMENDATION_FALLBACK = 'Hold the release until the dark theme is ready.';

export const DEMO_CONTEXT_CHUNKS: BuiContextChunk[] = [
  {
    id: 'naming',
    title: 'Token naming rule',
    meta: '290 characters',
    body: 'Every design token starts with the --bui- prefix and names its role, never its value.',
    source: 'Design Tokens Guide.pdf',
    badge: 'PDF',
    badgeTone: 'danger'
  },
  {
    id: 'inventory',
    title: 'Component inventory',
    meta: '1,250 characters',
    body: 'The prompt bar, markdown and code block cover most chat screens; the rest are situational.',
    source: 'components.csv',
    badge: 'CSV',
    badgeTone: 'success'
  }
];

export const DEMO_SOURCES: BuiSource[] = [
  {
    name: 'Signals guide',
    domain: 'angular.dev',
    href: 'https://angular.dev/guide/signals',
    image: demoAvatar('#c2185b', '<circle cx="32" cy="32" r="14" fill="#fff"/>')
  },
  {
    name: 'Using CSS custom properties',
    domain: 'developer.mozilla.org',
    href: 'https://developer.mozilla.org/docs/Web/CSS/Using_CSS_custom_properties',
    image: demoAvatar('#2f6fec', '<path d="M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z" fill="#fff"/>')
  },
  {
    name: 'Beautiful UI',
    domain: 'beautifului.dev',
    href: 'https://www.beautifului.dev',
    image: demoAvatar(
      '#1f7a5f',
      '<path d="M15 43 27 31l8 7 14-18" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
    )
  }
];

export const DEMO_CODE_LINES: string[] = [
  'export function formatElapsed(ms: number) {',
  '  const seconds = Math.floor(ms / 1000);',
  '  if (seconds < 60) return `${seconds}s`;',
  '  const minutes = Math.floor(seconds / 60);',
  '  return `${minutes}m ${seconds % 60}s`;',
  '}'
];

export const DEMO_CODE_DIFF: BuiDiffRow[] = [
  { old: 1, cur: 1, type: 'ctx', pieces: [{ text: 'export function formatElapsed(ms: number) {' }] },
  { old: 2, cur: 2, type: 'ctx', pieces: [{ text: '  const seconds = Math.floor(ms / 1000);' }] },
  {
    old: 3,
    cur: null,
    type: 'del',
    pieces: [{ text: '  if (seconds < ' }, { text: '90', change: 'del' }, { text: ') return `${seconds}s`;' }]
  },
  {
    old: null,
    cur: 3,
    type: 'add',
    pieces: [{ text: '  if (seconds < ' }, { text: '60', change: 'add' }, { text: ') return `${seconds}s`;' }]
  },
  { old: 4, cur: 4, type: 'ctx', pieces: [{ text: '  const minutes = Math.floor(seconds / 60);' }] },
  { old: null, cur: 5, type: 'add', pieces: [{ text: '  if (minutes >= 60) return `${Math.floor(minutes / 60)}h`;' }] },
  { old: 5, cur: 6, type: 'ctx', pieces: [{ text: '  return `${minutes}m ${seconds % 60}s`;' }] },
  { old: 6, cur: 7, type: 'ctx', pieces: [{ text: '}' }] }
];

export const DEMO_TONES: BuiTone[] = ['neutral', 'success', 'warning', 'danger', 'accent'];

export const DEMO_ENTITIES: DemoEntity[] = [
  { name: 'Design team', color: null, monogram: null },
  { name: 'Release bot', color: '#2f6fec', monogram: 'R' },
  { name: 'QA', color: '#1f7a5f', monogram: null }
];

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
  thinkingDoneLabel: null,
  activityEmpty: 'No activity yet. Send a message to see the steps behind each reply.'
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

export const DEMO_BUTTON_VARIANTS: BuiButtonVariant[] = ['primary', 'secondary', 'ghost', 'accent', 'success', 'quiet'];

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
