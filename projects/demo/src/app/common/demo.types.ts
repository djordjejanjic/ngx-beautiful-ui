import { BuiTableAlign } from 'ngx-beautiful-ui';

export type DemoAssistantPhase = 'loading' | 'thinking' | 'streaming' | 'done';

export interface DemoUserMessage {
  id: string;
  role: 'user';
  text: string;
  createdAt: number;
}

export interface DemoAssistantMessage {
  id: string;
  role: 'assistant';
  phase: DemoAssistantPhase;
  startedAt: number;
  thinkingMs: number | null;
  markdown: string;
  createdAt: number;
}

export type DemoMessage = DemoUserMessage | DemoAssistantMessage;

export type DemoAssistantPatch = Partial<Pick<DemoAssistantMessage, 'phase' | 'thinkingMs' | 'markdown'>>;

export interface DemoEntity {
  name: string;
  color: string | null;
  monogram: string | null;
}

export interface DemoTable {
  header: string[];
  align: BuiTableAlign[];
  rows: string[][];
}
