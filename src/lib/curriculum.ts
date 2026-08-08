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
  /** clear previously learned keys before applying this stage */
  resetKeys?: boolean;
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
  // Bagian Kiri (Left Keyboard)
  { id: "left-home", focus: "asdf", mode: "drill", count: 10, resetKeys: true },
  { id: "left-top", focus: "qwer", mode: "drill", count: 12 },
  { id: "left-bottom", focus: "zxcv", mode: "drill", count: 12 },
  { id: "left-reach", focus: "tgb", mode: "drill", count: 12 },
  { id: "left-all", focus: "asdfqwerzxcvtgb", mode: "word", count: 15 },

  // Bagian Kanan (Right Keyboard)
  { id: "right-home", focus: "jkl;", mode: "drill", count: 10, resetKeys: true },
  { id: "right-top", focus: "uiop", mode: "drill", count: 12 },
  { id: "right-bottom", focus: "m,.", mode: "drill", count: 12 },
  { id: "right-reach", focus: "yhn", mode: "drill", count: 12 },
  { id: "right-all", focus: "jkl;uiopm,.yhn", mode: "word", count: 15 },

  // Tahap Gabungan (Combined)
  { id: "home", focus: "asdfjkl;", mode: "word", count: 15, resetKeys: true },
  { id: "home-full", focus: "asdfghjkl;", mode: "word", count: 20, resetKeys: true },
  {
    id: "sentence",
    focus: "asdfghjkl qwertyuiop zxcvbnm,.!?",
    mode: "sentence",
    count: 1,
    resetKeys: true,
  },
];

export function compileStages(defs: StageDef[] = STAGES): CompiledLesson[] {
  let learned = new Set<string>();
  return defs.map((s) => {
    if (s.resetKeys) {
      learned.clear();
    }
    const focus = s.focus.split("");
    const keys = [...learned, ...focus];
    learned = new Set(keys);
    return { id: s.id, focus, keys, mode: s.mode, count: s.count };
  });
}
