import type { Config } from 'dompurify';
import { BuiApprovalDirection, BuiApprovalStatus, BuiApprovalType, BuiAttachmentStatus, BuiDiffTone, BuiMenuPlacement } from './bui.types';

const buiSvg = (markup: string): string => `data:image/svg+xml,${encodeURIComponent(markup)}`;

export const BUI_ICONS = {
  alert: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 16h.01"/></svg>'
  ),
  arrowUp: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
  ),
  arrowUpRight: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>'
  ),
  check: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>'
  ),
  chevronDown: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>'
  ),
  chevronUp: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>'
  ),
  clock: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  ),
  close: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'
  ),
  code: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/></svg>'
  ),
  copy: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
  ),
  cornerDownLeft: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10l-5 5 5 5"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></svg>'
  ),
  file: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'
  ),
  image: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/></svg>'
  ),
  lines: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>'
  ),
  more: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>'
  ),
  paperclip: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>'
  ),
  pencil: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>'
  ),
  plus: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>'
  ),
  retry: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/></svg>'
  ),
  sparkle: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>'
  ),
  stop: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2.5"/></svg>'
  ),
  terminal: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-5-6-5M12 19h8"/></svg>'
  ),
  thumbDown: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z"/></svg>'
  ),
  thumbUp: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z"/></svg>'
  ),
  trash: buiSvg(
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>'
  )
} as const;

export const BUI_ICON_SIZE = {
  tiny: '9px',
  xxs: '10px',
  xs: '11px',
  sm: '12px',
  md: '14px',
  base: '15px',
  lg: '16px'
} as const;

export const BUI_LABELS = {
  thinking: 'Thinking',
  thoughtFor: 'Thought for',
  second: 'second',
  seconds: 'seconds',
  thoughtFallback: 'Thought for a few seconds',
  promptPlaceholder: 'Write a message…',
  prompt: 'Prompt',
  send: 'Send',
  stop: 'Stop',
  addAttachments: 'Add attachments',
  removeAttachment: 'Remove',
  table: 'Scrollable table',
  contextHeading: 'All chunks',
  alternatives: 'Alternatives',
  otherOptions: 'Other options',
  accepted: 'Accepted',
  completed: 'Completed',
  failed: 'Failed',
  showDiff: 'Show diff for',
  copy: 'Copy',
  copied: 'Copied',
  copyCode: 'Copy code',
  sources: 'sources',
  skip: 'Skip',
  continue: 'Continue',
  sendAnswers: 'Send',
  customAnswerPlaceholder: 'Something else…',
  customAnswer: 'Custom answer',
  answersSent: 'Answers sent',
  startOver: 'Start over',
  dismiss: 'Dismiss',
  previousQuestion: 'Previous question',
  nextQuestion: 'Next question',
  stepDurationPrefix: 'for'
} as const;

export const BUI_STICK_TO_BOTTOM_THRESHOLD_PX = 24;

export const BUI_SIGNAL_METER_BARS = 3;

export const BUI_DIFF_SIGNS: Readonly<Record<BuiDiffTone, string>> = {
  add: '+',
  del: '−',
  ctx: ' '
};

export const BUI_DIFF_PREVIEW = {
  width: 288,
  margin: 12,
  offset: 6,
  headerHeight: 38,
  lineHeight: 19
} as const;

export const BUI_TOOL_CHIPS_FILE_CLASS = 'bui-tool-chips__file';

export const BUI_POPOVER_OPEN_SELECTOR = ':popover-open';

export const BUI_CODE_KEYWORDS: ReadonlySet<string> = new Set([
  'import',
  'from',
  'export',
  'default',
  'async',
  'function',
  'const',
  'let',
  'var',
  'await',
  'return',
  'if',
  'else',
  'for',
  'while',
  'new',
  'throw',
  'try',
  'catch',
  'null',
  'true',
  'false',
  'undefined'
]);

export const BUI_CODE_TOKEN_REGEXP =
  /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b(?:import|from|export|default|async|function|const|let|var|await|return|if|else|for|while|new|throw|try|catch|null|true|false|undefined)\b|[A-Za-z_$][\w$]*(?=\s*\())/g;

export const BUI_CODE_LITERAL_REGEXP = /^["'`\d]/;

export const BUI_COPY_RESET_MS = 1500;

export const BUI_APPROVAL_ADVANCE_MS = 480;

export const BUI_APPROVAL_DIRECTION = {
  forward: 'forward',
  back: 'back'
} as const satisfies Record<BuiApprovalDirection, BuiApprovalDirection>;

export const BUI_APPROVAL_STATUS = {
  open: 'open',
  sent: 'sent',
  closed: 'closed'
} as const satisfies Record<BuiApprovalStatus, BuiApprovalStatus>;

export const BUI_APPROVAL_TYPE = {
  single: 'single',
  multiple: 'multiple'
} as const satisfies Record<BuiApprovalType, BuiApprovalType>;

export const BUI_LOADER_CELL_DELAYS_MS: readonly number[] = [90, 180, 270, 0, 90, 180, 90, 180, 270];

export const BUI_ELAPSED_TICK_MS = 100;

export const BUI_MS_PER_SECOND = 1000;

export const BUI_SECONDS_PER_MINUTE = 60;

export const BUI_LOW_SURROGATE_RANGE = { min: 0xdc00, max: 0xdfff } as const;

export const BUI_STREAM_TAIL_LENGTH = 6;

export const BUI_IME_KEY_CODE = 229;

export const BUI_KEYBOARD_KEY = {
  enter: 'Enter',
  escape: 'Escape',
  tab: 'Tab',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown'
} as const;

export const BUI_MENU_NAVIGATION_STEPS: Readonly<Record<string, number>> = {
  [BUI_KEYBOARD_KEY.arrowDown]: 1,
  [BUI_KEYBOARD_KEY.arrowUp]: -1
};

export const BUI_ATTACHMENT_STATUS = {
  uploading: 'uploading',
  ready: 'ready',
  error: 'error'
} as const satisfies Record<BuiAttachmentStatus, BuiAttachmentStatus>;

export const BUI_MENU_PLACEMENT = {
  above: 'above',
  below: 'below'
} as const satisfies Record<BuiMenuPlacement, BuiMenuPlacement>;

export const BUI_MARKDOWN_INTERNAL_LINK_CLASS = 'bui-markdown__link--internal';

export const BUI_MARKDOWN_EXTERNAL_LINK_REL = 'noopener noreferrer nofollow';

export const BUI_MARKDOWN_EXTERNAL_LINK_TARGET = '_blank';

export const BUI_MARKDOWN_EXTERNAL_HREF_REGEXP = /^https?:/i;

export const BUI_MARKDOWN_INTERNAL_HREF_REGEXP = /^\/(?![/\\])/;

export const BUI_MARKDOWN_CHECKBOX = {
  checked: '☑ ',
  unchecked: '☐ '
} as const;

export const BUI_MARKDOWN_SANITIZE_CONFIG: Config = {
  ALLOWED_TAGS: [
    'p',
    'br',
    'strong',
    'em',
    'del',
    'code',
    'pre',
    'blockquote',
    'ul',
    'ol',
    'li',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'span'
  ],
  ALLOWED_ATTR: ['href', 'title', 'align', 'start', 'colspan', 'rowspan'],
  ADD_URI_SAFE_ATTR: ['start', 'align', 'colspan', 'rowspan'],
  ALLOWED_URI_REGEXP: /^(?:https?:|mailto:|tel:|\/(?![/\\])|#)/i,
  FORBID_TAGS: ['img', 'svg', 'math', 'style', 'iframe', 'form', 'input', 'video', 'audio'],
  ALLOW_DATA_ATTR: false,
  ALLOW_ARIA_ATTR: false
};
