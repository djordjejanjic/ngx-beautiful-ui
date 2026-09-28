export type BuiButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'quiet';

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
