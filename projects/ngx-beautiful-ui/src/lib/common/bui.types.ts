import type { TemplateRef } from '@angular/core';

export type BuiButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'success' | 'quiet';

export type BuiButtonSize = 'xs' | 'sm' | 'md';

export type BuiButtonType = 'button' | 'submit' | 'reset';

export type BuiAttachmentStatus = 'uploading' | 'ready' | 'error';

export type BuiTableAlign = 'left' | 'center' | 'right' | null;

export type BuiMenuPlacement = 'above' | 'below';

export type BuiMenuItemTone = 'default' | 'danger';

export interface BuiAttachmentChip {
  id: string;
  name: string;
  status: BuiAttachmentStatus;
}

export interface BuiMenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  tone?: BuiMenuItemTone;
  disabled?: boolean;
}

export interface BuiAction {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

export interface BuiChipOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface BuiChipView extends BuiChipOption {
  selected: boolean;
}

export interface BuiMarkdownHtmlSegment {
  kind: 'html';
  html: string;
}

export interface BuiMarkdownTableSegment {
  kind: 'table';
  header: string[];
  align: BuiTableAlign[];
  rows: string[][];
}

export type BuiMarkdownSegment = BuiMarkdownHtmlSegment | BuiMarkdownTableSegment;

export interface BuiTextSplit {
  head: string;
  tail: string;
}

export type BuiTone = 'neutral' | 'success' | 'warning' | 'danger' | 'accent';

export interface BuiSource {
  name: string;
  domain: string;
  href: string;
  image?: string;
}

export interface BuiContextChunk {
  id: string;
  title: string;
  body: string;
  source: string;
  badge: string;
  meta?: string;
  badgeTone?: BuiTone;
  href?: string;
}

export interface BuiRecommendation {
  id: string;
  body: string | TemplateRef<unknown>;
  summary: string;
  signal: number;
  tone: BuiTone;
  label: string;
  cta: string;
  ctaVariant?: BuiButtonVariant;
}

export interface BuiRecommendationView extends BuiRecommendation {
  text: string;
  template: TemplateRef<unknown> | null;
}

export type BuiTaskStatus = 'pending' | 'running' | 'failed' | 'done';

export type BuiTaskLayout = 'capsules' | 'list';

export interface BuiTaskDetail {
  label: string;
  meta?: string;
}

export interface BuiTask {
  id: string;
  label: string;
  status: BuiTaskStatus;
  meta?: string;
  step?: number | string;
  details?: BuiTaskDetail[];
}

export interface BuiTaskView extends BuiTask {
  expanded: boolean;
  details: BuiTaskDetail[];
}

export type BuiDiffTone = 'add' | 'del' | 'ctx';

export interface BuiToolDetailLine {
  text: string;
  tone?: 'add';
}

export interface BuiToolStep {
  id: string;
  icon: string;
  label: string;
  chip: string;
  mono?: boolean;
  detailMono?: boolean;
  detail?: BuiToolDetailLine[];
}

export interface BuiToolStepView extends BuiToolStep {
  expanded: boolean;
  detail: BuiToolDetailLine[];
}

export interface BuiDiffLine {
  text: string;
  tone: BuiDiffTone;
}

export interface BuiDiffLineView extends BuiDiffLine {
  sign: string;
}

export interface BuiFileDiff {
  file: string;
  added: number;
  removed: number;
  lines?: BuiDiffLine[];
}

export interface BuiFileDiffView extends BuiFileDiff {
  ariaLabel: string;
  lines: BuiDiffLineView[];
}

export interface BuiDiffPreview {
  file: BuiFileDiffView;
  left: number;
  top: number | null;
  bottom: number | null;
}

export type BuiCodeBlockMode = 'code' | 'diff';

export type BuiCodeTokenKind = 'plain' | 'literal' | 'keyword' | 'call';

export interface BuiCodeToken {
  text: string;
  kind: BuiCodeTokenKind;
}

export interface BuiCodePiece {
  text: string;
  change?: 'add' | 'del';
}

export interface BuiDiffRow {
  old: number | null;
  cur: number | null;
  type: BuiDiffTone;
  pieces: BuiCodePiece[];
}

export interface BuiCodeLineView {
  number: number;
  tokens: BuiCodeToken[];
}

export interface BuiCodePieceView {
  change: 'add' | 'del' | null;
  tokens: BuiCodeToken[];
}

export interface BuiDiffRowView {
  number: number | null;
  type: BuiDiffTone;
  pieces: BuiCodePieceView[];
}

export type BuiApprovalType = 'single' | 'multiple';

export type BuiApprovalDirection = 'forward' | 'back';

export type BuiApprovalStatus = 'open' | 'sent' | 'closed';

export interface BuiApprovalQuestion {
  id: string;
  question: string;
  type: BuiApprovalType;
  options: string[];
}

export interface BuiApprovalAnswer {
  selected: string[];
  custom: string;
}

export type BuiApprovalAnswers = Record<string, BuiApprovalAnswer>;

export interface BuiApprovalOptionView {
  label: string;
  selected: boolean;
}

export interface BuiChatTab {
  id: string;
  label: string;
}
