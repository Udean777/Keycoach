import type { CompiledLesson } from "./curriculum";
import { DICTIONARIES, type LanguageCode } from "./dictionaries";

/**
 * Build the target text for a lesson.
 * - drill: syllable-shaped combos (3-7 chars) from this stage's focus keys
 * - word:  real short words restricted to learned keys
 * - sentence: full sentence (en/id/es/de/ru) using full keyboard
 */

/** drill cycles each available word; never fewer than this many combos */
const MIN_DRILL_COUNT = 10;

export interface GenerateOptions {
  lesson: CompiledLesson;
  lang: LanguageCode;
  /** reserved — future per-key weighting for drills */
  weights?: Record<string, number>;
  srs?: Map<string, unknown>;
  now?: number;
}

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

/** combos built as pronounceable syllable shapes instead of random letter salad */
// generateLetterCombos removed to favor 4-letter synthetic permutations for drills

/** build the list of target words (space-separated source text, then split) */
export function generateWords(opts: GenerateOptions): string[] {
  const { lesson, lang } = opts;

  if (lesson.mode === "sentence") {
    const s = DICTIONARIES[lang].sentences;
    return s[Math.floor(Math.random() * s.length)].split(" ").filter(Boolean);
  }

  const allowed = new Set(
    (lesson.mode === "drill" ? lesson.focus : lesson.keys).filter((k) =>
      /[a-z;,\.\/]/.test(k),
    ),
  );

  if (lesson.mode === "drill") {
    const target = lesson.count > 0 ? lesson.count : MIN_DRILL_COUNT;
    const keys = Array.from(allowed);
    const out = new Set<string>();
    let attempts = 0;
    while (out.size < target && attempts < 1000) {
      attempts++;
      let word = "";
      for (let i = 0; i < 4; i++) {
        word += keys[Math.floor(Math.random() * keys.length)];
      }
      out.add(word);
    }
    return Array.from(out);
  }

  const dict = DICTIONARIES[lang].words;
  const pool = Array.from(
    new Set(dict.filter((w) => [...w].every((c) => allowed.has(c)))),
  );
  const usable = pool.length > 0 ? pool : Array.from(new Set(dict));

  const out: string[] = [];
  const available = [...usable];
  for (let i = 0; i < lesson.count && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    out.push(available[idx]);
    available.splice(idx, 1);
  }
  return out;
}
