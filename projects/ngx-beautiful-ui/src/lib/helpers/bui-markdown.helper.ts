import DOMPurify, { type DOMPurify as DOMPurifyInstance } from 'dompurify';
import { Marked, type Token, type Tokens } from 'marked';
import {
  BUI_MARKDOWN_CHECKBOX,
  BUI_MARKDOWN_EXTERNAL_HREF_REGEXP,
  BUI_MARKDOWN_EXTERNAL_LINK_REL,
  BUI_MARKDOWN_EXTERNAL_LINK_TARGET,
  BUI_MARKDOWN_INTERNAL_HREF_REGEXP,
  BUI_MARKDOWN_INTERNAL_LINK_CLASS,
  BUI_MARKDOWN_SANITIZE_CONFIG
} from '../common/bui.constants';
import { BuiMarkdownHtmlSegment, BuiMarkdownSegment, BuiMarkdownTableSegment } from '../common/bui.types';

export class BuiMarkdownHelper {
  private static readonly markdown = new Marked({
    gfm: true,
    breaks: true,
    renderer: {
      html: (token: Tokens.HTML | Tokens.Tag) => BuiMarkdownHelper.renderRawHtml(token),
      image: (token: Tokens.Image) => BuiMarkdownHelper.escapeHtml(token.text),
      text: (token: Tokens.Text | Tokens.Escape) => BuiMarkdownHelper.renderRawText(token),
      checkbox: (token: Tokens.Checkbox) => (token.checked ? BUI_MARKDOWN_CHECKBOX.checked : BUI_MARKDOWN_CHECKBOX.unchecked)
    }
  });

  private static purifierInstance: DOMPurifyInstance | null = null;

  private static get purifier(): DOMPurifyInstance {
    return (BuiMarkdownHelper.purifierInstance ??= BuiMarkdownHelper.createPurifier());
  }

  static toSegments(markdown: string): BuiMarkdownSegment[] {
    if (!markdown) return [];

    return BuiMarkdownHelper.groupTokens(BuiMarkdownHelper.markdown.lexer(markdown)).map(group =>
      group[0].type === 'table' ? BuiMarkdownHelper.toTableSegment(group[0] as Tokens.Table) : BuiMarkdownHelper.toHtmlSegment(group)
    );
  }

  static sanitize(html: string): string {
    return BuiMarkdownHelper.purifier.sanitize(html, BUI_MARKDOWN_SANITIZE_CONFIG);
  }

  static isInternalHref(href: string): boolean {
    return BUI_MARKDOWN_INTERNAL_HREF_REGEXP.test(href);
  }

  static resolveLink(event: MouseEvent, origin: string): string | null {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

    const anchor = event.target instanceof Element ? event.target.closest('a') : null;
    const container = event.currentTarget instanceof Element ? event.currentTarget : null;
    const href = anchor?.getAttribute('href');
    if (!href || !container?.contains(anchor) || !BuiMarkdownHelper.isInternalHref(href)) return null;

    const url = new URL(href, origin);
    return url.origin === origin ? `${url.pathname}${url.search}${url.hash}` : null;
  }

  private static groupTokens(tokens: Token[]): Token[][] {
    return tokens
      .reduce<Token[][]>((groups, token) => {
        const lastGroup = groups[groups.length - 1];
        const canJoin = token.type !== 'table' && lastGroup && lastGroup[0].type !== 'table';
        if (canJoin) lastGroup.push(token);
        else groups.push([token]);
        return groups;
      }, [])
      .filter(group => group.some(token => token.type !== 'space'));
  }

  private static toHtmlSegment(tokens: Token[]): BuiMarkdownHtmlSegment {
    return { kind: 'html', html: BuiMarkdownHelper.sanitize(BuiMarkdownHelper.markdown.parser(tokens)) };
  }

  private static toTableSegment(table: Tokens.Table): BuiMarkdownTableSegment {
    return {
      kind: 'table',
      header: table.header.map(cell => BuiMarkdownHelper.renderCell(cell)),
      align: table.align,
      rows: table.rows.map(row => row.map(cell => BuiMarkdownHelper.renderCell(cell)))
    };
  }

  private static renderCell(cell: Tokens.TableCell): string {
    const { Parser, defaults } = BuiMarkdownHelper.markdown;
    return BuiMarkdownHelper.sanitize(Parser.parseInline(cell.tokens, defaults));
  }

  private static renderRawHtml(token: Tokens.HTML | Tokens.Tag): string {
    const escaped = BuiMarkdownHelper.escapeHtml(token.text);
    return token.block ? `<p>${escaped.trim()}</p>` : escaped;
  }

  private static renderRawText(token: Tokens.Text | Tokens.Escape): string | false {
    const isRawBlockText = 'escaped' in token && token.escaped && !('tokens' in token && token.tokens);
    return isRawBlockText ? BuiMarkdownHelper.escapeHtml(token.text) : false;
  }

  private static escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  private static createPurifier(): DOMPurifyInstance {
    const purifier = DOMPurify(window);
    purifier.addHook('afterSanitizeAttributes', node => BuiMarkdownHelper.decorateLink(node));
    return purifier;
  }

  private static decorateLink(node: Element): void {
    const href = node.nodeName === 'A' ? node.getAttribute('href') : null;
    if (!href) return;

    node.removeAttribute('target');
    if (BuiMarkdownHelper.isInternalHref(href)) {
      node.classList.add(BUI_MARKDOWN_INTERNAL_LINK_CLASS);
      return;
    }

    node.setAttribute('rel', BUI_MARKDOWN_EXTERNAL_LINK_REL);
    if (BUI_MARKDOWN_EXTERNAL_HREF_REGEXP.test(href)) node.setAttribute('target', BUI_MARKDOWN_EXTERNAL_LINK_TARGET);
  }
}
