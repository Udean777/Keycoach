/**
 * Curriculum data — data-driven, home-row first. Extensible to other rows later.
 *
 * A stage introduces a NEW key set (focus) while practicing previously-learned
 * keys (base). Modes:
 *   - drill: typed text = random combinations of learned keys
 *   - word:  typed text = real short words using only learned keys
 *   - sentence: typed text = a full sentence using the full keyboard
 */

export type LessonMode = "drill" | "word" | "sentence";

export interface StageDef {
  id: string;
  /** new keys this stage teaches */
  focus: string;
  mode: LessonMode;
  /** number of tokens to type (drill tokens, or words) */
  count: number;
}

export interface CompiledLesson {
  id: string;
  /** the NEW keys this stage teaches (highlighted) */
  focus: string[];
  /** learned keys (base ∪ focus) */
  keys: string[];
  mode: LessonMode;
  count: number;
}

export const STAGES: StageDef[] = [
  { id: "as", focus: "as", mode: "drill", count: 5 },
  { id: "df", focus: "df", mode: "drill", count: 8 },
  { id: "jk", focus: "jk", mode: "drill", count: 12 },
  { id: "l", focus: "l;", mode: "drill", count: 15 },
  { id: "home-row", focus: "asdfghjkl;", mode: "drill", count: 18 },
  { id: "home-words", focus: "asdfghjkl", mode: "word", count: 20 },
  { id: "sentence", focus: "asdfghjkl qwertyuiop zxcvbnm,.!?", mode: "sentence", count: 1 },
];

export function compileStages(defs: StageDef[] = STAGES): CompiledLesson[] {
  let learned = new Set<string>();
  return defs.map((s) => {
    const focus = s.focus.split("");
    const keys = [...learned, ...focus];
    learned = new Set(keys);
    return { id: s.id, focus, keys, mode: s.mode, count: s.count };
  });
}
