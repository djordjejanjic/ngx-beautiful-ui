import { computed, Injectable, signal } from '@angular/core';
import { BuiFileDiff, BuiTaskStatus } from 'ngx-beautiful-ui';
import { interval, merge, Subscription, take, tap, timer } from 'rxjs';
import { DEMO_AGENT_TIMING, DEMO_SEQUENCE_TASK_ID, DEMO_TASKS, DEMO_TOOL_FILES, DEMO_TOOL_STEPS } from '../common/demo.constants';

@Injectable({ providedIn: 'root' })
export class DemoAgentService {
  private run: Subscription | null = null;

  private readonly revealed = signal(0);
  private readonly sequenceStatus = signal<BuiTaskStatus>('pending');

  readonly steps = computed(() => DEMO_TOOL_STEPS.slice(0, this.revealed()));
  readonly files = computed<BuiFileDiff[]>(() => (this.revealed() > DEMO_TOOL_STEPS.length ? DEMO_TOOL_FILES : []));
  readonly tasks = computed(() =>
    DEMO_TASKS.map(task => (task.id === DEMO_SEQUENCE_TASK_ID ? { ...task, status: this.sequenceStatus() } : task))
  );

  constructor() {
    this.replay();
  }

  replay(): void {
    this.run?.unsubscribe();
    this.revealed.set(0);
    this.sequenceStatus.set('pending');
    this.run = merge(
      interval(DEMO_AGENT_TIMING.stepMs).pipe(
        take(DEMO_TOOL_STEPS.length + 1),
        tap(() => this.revealed.update(count => count + 1))
      ),
      timer(DEMO_AGENT_TIMING.failMs).pipe(tap(() => this.sequenceStatus.set('failed'))),
      timer(DEMO_AGENT_TIMING.doneMs).pipe(tap(() => this.sequenceStatus.set('done')))
    ).subscribe();
  }
}
