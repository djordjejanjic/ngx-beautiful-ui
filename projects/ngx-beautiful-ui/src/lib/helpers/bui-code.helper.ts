import { BUI_CODE_KEYWORDS, BUI_CODE_LITERAL_REGEXP, BUI_CODE_TOKEN_REGEXP } from '../common/bui.constants';
import { BuiCodeLineView, BuiCodeToken, BuiCodeTokenKind, BuiDiffRow, BuiDiffRowView } from '../common/bui.types';

export class BuiCodeHelper {
  static highlight(text: string): BuiCodeToken[] {
    const tokens: BuiCodeToken[] = [];
    let last = 0;
    for (const match of text.matchAll(BUI_CODE_TOKEN_REGEXP)) {
      const index = match.index ?? 0;
      if (index > last) tokens.push({ text: text.slice(last, index), kind: 'plain' });
      tokens.push({ text: match[0], kind: BuiCodeHelper.kindOf(match[0]) });
      last = index + match[0].length;
    }
    if (last < text.length) tokens.push({ text: text.slice(last), kind: 'plain' });
    return tokens;
  }

  static toLines(lines: string[]): BuiCodeLineView[] {
    return lines.map((line, index) => ({ number: index + 1, tokens: BuiCodeHelper.highlight(line) }));
  }

  static toDiffRows(rows: BuiDiffRow[]): BuiDiffRowView[] {
    return rows.map(row => ({
      number: row.type === 'del' ? row.old : row.cur,
      type: row.type,
      pieces: row.pieces.map(piece => ({ change: piece.change ?? null, tokens: BuiCodeHelper.highlight(piece.text) }))
    }));
  }

  private static kindOf(token: string): BuiCodeTokenKind {
    if (BUI_CODE_LITERAL_REGEXP.test(token)) return 'literal';
    return BUI_CODE_KEYWORDS.has(token) ? 'keyword' : 'call';
  }
}
