import { computed, Injectable, signal } from '@angular/core';
import { BUI_ATTACHMENT_STATUS, BuiAttachmentChip } from 'ngx-beautiful-ui';
import { concat, interval, map, Observable, Subscription, take, timer } from 'rxjs';
import { DEMO_ATTACHMENT_NAMES, DEMO_COPY, DEMO_REPLY, DEMO_REPLY_STEPS, DEMO_TIMING } from '../common/demo.constants';
import { DemoAssistantMessage, DemoAssistantPatch, DemoMessage, DemoReplyStepView } from '../common/demo.types';

@Injectable({ providedIn: 'root' })
export class DemoChatService {
  private reply: Subscription | null = null;
  private activeId: string | null = null;

  readonly messages = signal<DemoMessage[]>([]);
  readonly attachments = signal<BuiAttachmentChip[]>([]);

  readonly busy = computed(() => this.messages().some(message => message.role === 'assistant' && message.phase !== 'done'));
  readonly isEmpty = computed(() => this.messages().length === 0);

  readonly activity = computed<DemoReplyStepView[]>(() => {
    const latest = this.messages()
      .filter((message): message is DemoAssistantMessage => message.role === 'assistant')
      .at(-1);
    if (!latest || latest.phase === 'loading') return [];

    const visible = latest.phase === 'thinking' ? 1 : DEMO_REPLY_STEPS.length;
    return DEMO_REPLY_STEPS.slice(0, visible).map((step, index) => ({
      ...step,
      id: `${latest.id}-${index}`,
      resolving: latest.phase === 'streaming' && index === DEMO_REPLY_STEPS.length - 1
    }));
  });

  send(text: string): void {
    if (this.busy()) return;

    const now = Date.now();
    const assistantId = `assistant-${now}`;
    const readyNames = this.attachments()
      .filter(attachment => attachment.status === BUI_ATTACHMENT_STATUS.ready)
      .map(attachment => attachment.name);
    const userText = text || readyNames.join(', ') || DEMO_COPY.attachmentFallback;

    this.messages.update(messages => [
      ...messages,
      { id: `user-${now}`, role: 'user', text: userText, createdAt: now },
      { id: assistantId, role: 'assistant', phase: 'loading', startedAt: now, thinkingMs: null, markdown: '', createdAt: now }
    ]);
    this.attachments.set([]);
    this.activeId = assistantId;
    this.reply = this.replyFrames().subscribe({
      next: patch => this.patch(assistantId, patch),
      complete: () => this.finish(assistantId)
    });
  }

  reset(): void {
    this.reply?.unsubscribe();
    this.reply = null;
    this.activeId = null;
    this.messages.set([]);
    this.attachments.set([]);
  }

  stop(): void {
    const id = this.activeId;
    this.reply?.unsubscribe();
    if (!id) return;

    const message = this.messages().find((item): item is DemoAssistantMessage => item.id === id && item.role === 'assistant');
    this.patch(id, {
      thinkingMs: message?.thinkingMs ?? Date.now() - (message?.startedAt ?? Date.now()),
      markdown: message?.markdown || DEMO_COPY.stoppedReply
    });
    this.finish(id);
  }

  attach(kind: string): void {
    const attachment: BuiAttachmentChip = {
      id: `${kind}-${Date.now()}`,
      name: DEMO_ATTACHMENT_NAMES[kind] ?? DEMO_COPY.attachmentFallback,
      status: BUI_ATTACHMENT_STATUS.uploading
    };
    this.attachments.update(list => [...list, attachment]);
    timer(DEMO_TIMING.uploadMs).subscribe(() =>
      this.attachments.update(list =>
        list.map(item => (item.id === attachment.id ? { ...item, status: BUI_ATTACHMENT_STATUS.ready } : item))
      )
    );
  }

  removeAttachment(id: string): void {
    this.attachments.update(list => list.filter(attachment => attachment.id !== id));
  }

  private replyFrames(): Observable<DemoAssistantPatch> {
    const frames = Math.ceil(DEMO_REPLY.length / DEMO_TIMING.streamChunk);
    return concat(
      timer(DEMO_TIMING.loadingMs).pipe(map((): DemoAssistantPatch => ({ phase: 'thinking' }))),
      timer(DEMO_TIMING.thinkingMs).pipe(map((): DemoAssistantPatch => ({ phase: 'streaming', thinkingMs: DEMO_TIMING.thinkingMs }))),
      interval(DEMO_TIMING.streamTickMs).pipe(
        take(frames),
        map((frame): DemoAssistantPatch => ({ markdown: DEMO_REPLY.slice(0, (frame + 1) * DEMO_TIMING.streamChunk) }))
      )
    );
  }

  private patch(id: string, patch: DemoAssistantPatch): void {
    this.messages.update(messages =>
      messages.map(message => (message.id === id && message.role === 'assistant' ? { ...message, ...patch } : message))
    );
  }

  private finish(id: string): void {
    this.patch(id, { phase: 'done' });
    this.reply = null;
    this.activeId = null;
  }
}
