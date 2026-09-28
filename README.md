# ngx-beautiful-ui

An unofficial Angular port of [Beautiful UI](https://www.beautifului.dev), the copy-paste React primitives for AI-native interfaces by
[Shane Levine](https://github.com/slev12397/beautiful-ui) (built by [Turbo](https://turbodesign.co)).

Standalone components, signal inputs, `OnPush` everywhere, and plain SCSS driven by `--bui-*` CSS custom properties. There is no Tailwind
and no UI framework dependency.

> This project is not affiliated with or endorsed by the original authors. The port was produced with AI assistance. Issues and pull
> requests are welcome.

## Components

| Selector                  | What it does                                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Chat**                  |                                                                                                                      |
| `bui-chat-panel`          | Fixed-height chat card with tab chips, header actions, a thread that sticks to the bottom and a composer slot.       |
| `bui-prompt-bar`          | Composer with an auto-growing textarea, attachment chips, a `+` menu and send/stop. Signal-forms control (`string`). |
| `bui-user-bubble`         | User message bubble with a timestamp and `[buiBubbleAttachments]` / `[buiBubbleActions]` content slots.              |
| `bui-markdown`            | GFM markdown rendered with `marked`, sanitised with DOMPurify. Emits `(linkActivated)` for same-origin links.        |
| `bui-stream-text`         | Plain text that streams in with a soft blurred tail and a caret.                                                     |
| `bui-action-row`          | Row of icon actions (copy, feedback, retry…) with an optional timestamp.                                             |
| `bui-suggestion-chips`    | Staggered list of follow-up suggestions.                                                                             |
| `bui-source-chip`         | Inline citation chip with a favicon and domain.                                                                      |
| `bui-source-list`         | "3 sources" toggle with an avatar stack that expands into the full source list.                                      |
| **Agent status**          |                                                                                                                      |
| `bui-loading-state`       | Pixel-grid loader with a shimmering label and an elapsed timer.                                                      |
| `bui-thinking-state`      | Collapsible "Thinking… / Thought for 4 seconds" trace with two-way `[(expanded)]`.                                   |
| `bui-reply-step`          | One agent step (label, subtitle, "for 4s" and text) with a blurred resolving state.                                  |
| `bui-tool-chips`          | Tool calls as compact, expandable rows, plus file-diff chips with a hover diff preview.                              |
| `bui-task-rows`           | Pending, running, failed and completed tasks with expandable details, as capsules or a list.                         |
| `bui-approval-card`       | Human-in-the-loop questions, one at a time, with single or multiple choice and a custom answer.                      |
| `bui-recommendation-card` | Agent suggestion with a confidence meter, alternatives drawer and accept action.                                     |
| `bui-context-cards`       | Retrieved knowledge chunks with their sources.                                                                       |
| `bui-code-block`          | Line-numbered code listing with copy, or a unified diff with word-level changes.                                     |
| **Building blocks**       |                                                                                                                      |
| `bui-button`              | `primary`, `secondary`, `ghost`, `accent`, `success` and `quiet` variants in `xs`, `sm` and `md` sizes.              |
| `bui-chip-select`         | Single or multiple chip picker. Signal-forms control (`string[]`).                                                   |
| `bui-glide-menu`          | Menu with a gliding highlight, arrow-key navigation, disabled items and a danger tone.                               |
| `bui-data-table`          | Scrollable, card-style table. Used by `bui-markdown` for tables and usable on its own.                               |
| `bui-entity-chip`         | Inline reference to a person, team or record: a monogram and a name.                                                 |
| `bui-value-pill`          | Inline value badge in `neutral`, `success`, `warning`, `danger` or `accent`.                                         |
| `bui-signal-meter`        | Three-bar confidence meter.                                                                                          |
| `bui-shimmer`             | Shimmering text for pending states.                                                                                  |
| `bui-icon`                | Mask-based icon that takes any image URL and is coloured with `currentColor`.                                        |

The package also exports `BuiClickOutsideDirective`, `BuiStickToBottomDirective`, the `BUI_ICONS` set, all `Bui*` types and the static helpers used by the components.

## Requirements

- Angular `^21.2` (standalone, zoneless or zone.js).
- `bui-prompt-bar` and `bui-chip-select` implement `FormValueControl` from `@angular/forms/signals`, which is still experimental in
  Angular 21.
- The diff preview in `bui-tool-chips` uses the browser Popover API (Chrome 114+, Safari 17+, Firefox 125+). Older browsers
  simply show no preview.
- Light theme only for now. Server-side rendering has not been tested yet.

## Installation

The package is not on npm yet. Until it is, build it from source:

```bash
git clone https://github.com/djordjejanjic/ngx-beautiful-ui.git
cd ngx-beautiful-ui
npm install
npm run build:lib
npm install ../ngx-beautiful-ui/dist/ngx-beautiful-ui --prefix ../your-app
```

Then add the styles once, either in `angular.json`:

```json
"styles": ["node_modules/ngx-beautiful-ui/styles/beautiful-ui.scss", "src/styles.scss"]
```

or at the top of your global stylesheet:

```scss
@use 'ngx-beautiful-ui/styles';
```

## Usage

```ts
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { BuiMarkdownComponent, BuiPromptBarComponent } from 'ngx-beautiful-ui';

@Component({
  selector: 'app-chat',
  imports: [FormField, BuiMarkdownComponent, BuiPromptBarComponent],
  template: `
    <bui-markdown [markdown]="answer()" [streaming]="streaming()" />
    <bui-prompt-bar [formField]="draft.text" [busy]="streaming()" (submitted)="send($event)" (stopped)="stop()" />
  `
})
export class ChatComponent {
  protected readonly draft = form(signal({ text: '' }));
  protected readonly answer = signal('');
  protected readonly streaming = signal(false);

  send(prompt: string): void {}

  stop(): void {}
}
```

The [demo app](projects/demo/src/app) composes every primitive into a scripted conversation and is the best reference for wiring them
together.

## Theming

Every colour, space, radius, duration and font size is a CSS custom property defined on `:root` in
[`styles/_tokens.scss`](projects/ngx-beautiful-ui/styles/_tokens.scss). Override any of them globally or on a wrapper element:

```scss
.my-assistant {
  --bui-accent: #0a84ff;
  --bui-accent-soft: #eef5ff;
  --bui-accent-border: #b9d8ff;
  --bui-radius-3xl: 16px;
}
```

Components also expose their own sizing tokens, such as `--bui-task-row-height`, `--bui-card-max-width`, `--bui-prompt-bar-radius` and
`--bui-menu-row-height`, and code colours live in `--bui-code-keyword`, `--bui-code-literal` and `--bui-code-function`.

## Icons

`BUI_ICONS` contains the built-in icons as inline SVG data URIs, so there are no assets to copy. Every `icon` input (`BuiAction.icon`,
`BuiMenuItem.icon`, `sendIcon`) accepts any image URL, so you can pass your own asset paths or data URIs instead.

## Differences from the original

- The original is a React 19 + Tailwind v4 shadcn registry. This port is built with Angular signals and plain SCSS, and components take
  their data through inputs instead of shipping demo content.
- Not ported yet: diff table, records table, filter table, sidebar nav, search, flowchart, insight cards, fine-tune card
  and selection actions. `bui-user-bubble`, `bui-markdown`, `bui-chip-select` and `bui-suggestion-chips` are additions of this port.
- The original ships a commercial icon set. This port uses its own icons derived from [Lucide](https://lucide.dev), see
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Development

```bash
npm install
npm start            # demo app on http://localhost:4200
npm run build        # library and demo
npm run lint
npm run format:check
```

## License

[MIT](LICENSE). The original design and React library are © Shane Levine. The Angular port is © Djordje Janjic. Icon shapes are derived
from Lucide (ISC), Feather (MIT) and Heroicons (MIT), see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
