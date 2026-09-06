/**
 * Pure helpers for turning an AI-generated story template into rendered output.
 *
 * A template is plain text whose blanks look like `<noun-1>`, `<adjective-2>`.
 * `tokenize` splits it into literal text and blank tokens so the UI can show
 * each filled-in word with its own styling (e.g. highlighter marks).
 */

export interface StoryToken {
  text: string;
  /** true when this token is a value the player typed in */
  isFill: boolean;
}

const PLACEHOLDER_RE = /<[^>]+>/g;

/** Removes angle brackets and the incremental id suffix: `<noun-2>` -> `noun`. */
export function placeholderType(placeholder: string): string {
  return placeholder.replace(/[<>]/g, '').replace(/-\d+$/, '');
}

/**
 * Splits a template into text and fill tokens, substituting each placeholder
 * with the player's value (or a visible `[noun]` fallback when left blank).
 */
export function tokenize(template: string, values: Record<string, string>): StoryToken[] {
  const tokens: StoryToken[] = [];
  let cursor = 0;
  for (const match of template.matchAll(PLACEHOLDER_RE)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      tokens.push({ text: template.slice(cursor, index), isFill: false });
    }
    const placeholder = match[0];
    const value = values[placeholder]?.trim();
    tokens.push({
      text: value ? value : `[${placeholderType(placeholder)}]`,
      isFill: true,
    });
    cursor = index + placeholder.length;
  }
  if (cursor < template.length) {
    tokens.push({ text: template.slice(cursor), isFill: false });
  }
  return tokens;
}

/**
 * Splits the leading `**Title**` line off a story, if present.
 * Returns the title without asterisks and the remaining body.
 */
export function splitTitle(story: string): { title: string; body: string } {
  const lines = story.split('\n');
  const titleLine = lines[0]?.trim() ?? '';
  const match = titleLine.match(/^\*+(.*?)\*+$/);
  if (!match) {
    return { title: '', body: story };
  }
  return { title: match[1].trim(), body: lines.slice(1).join('\n').trim() };
}
