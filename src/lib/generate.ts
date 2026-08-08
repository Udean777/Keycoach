import type { CompiledLesson } from "./curriculum";

/**
 * Build the target text for a lesson.
 * - drill: syllable-shaped combos (3-7 chars) from this stage's focus keys
 * - word:  real short words restricted to learned keys
 * - sentence: full sentence (en/id) using full keyboard
 */

/** short home-row-friendly words (lowercase, no punct) — both languages share QWERTY letters */
const HOME_WORDS = [
  "as",
  "ad",
  "al",
  "all",
  "ask",
  "also",
  "dad",
  "fall",
  "flag",
  "gal",
  "glad",
  "glass",
  "half",
  "hall",
  "has",
  "jazz",
  "lad",
  "lads",
  "sad",
  "saga",
  "salad",
  "sash",
  "sass",
  "shall",
  "shag",
  "slad",
];

const SENTENCES = {
  en: [
    "the quick brown fox jumps over the lazy dog",
    "every new day brings a fresh start and a brand new opportunity",
    "kind words and a gentle smile can brighten someones day",
    "small steps every day can lead to great success over time",
    "she loves to read books and write stories in her free time",
  ],
  id: [
    "burung berkicau menyambut pagi yang cerah dan penuh harapan baru",
    "setiap langkah kecil yang kita ambil hari ini menentukan masa depan",
    "kita harus selalu saling menghormati dan membantu sesama manusia",
    "kesehatan adalah harta paling berharga yang harus selalu kita jaga",
    "keberhasilan membutuhkan kerja keras kesabaran serta doa yang tulus",
  ],
};

export interface GenerateOptions {
  lesson: CompiledLesson;
  lang: "en" | "id";
  /** reserved — future per-key weighting for drills */
  srs?: Map<string, unknown>;
  now?: number;
}

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

/** combos built as pronounceable syllable shapes instead of random letter salad */
/** drill cycles each available word; never fewer than this many combos */
const MIN_DRILL_COUNT = 10;

/** generate unique synthetic character combos for 2-key drill stages without any duplicates */
function generateLetterCombos(keys: string[], count: number): string[] {
  const [a, b] = keys;
  if (!a) return [];
  if (!b) return [a];

  // Comprehensive unique permutations for 2 letters (2-char, 3-char, and 4-char)
  const allPossible = [
    `${a}${b}`,
    `${b}${a}`,
    `${a}${a}${b}`,
    `${a}${b}${a}`,
    `${b}${a}${a}`,
    `${b}${b}${a}`,
    `${b}${a}${b}`,
    `${a}${b}${b}`,
    `${a}${a}${a}${b}`,
    `${a}${b}${a}${b}`,
    `${b}${a}${b}${a}`,
    `${b}${b}${b}${a}`,
    `${a}${a}${b}${b}`,
    `${b}${b}${a}${a}`,
  ];

  // Filter out any duplicates
  const uniquePool = Array.from(new Set(allPossible));
  return uniquePool.slice(0, Math.min(count, uniquePool.length));
}

/** build the list of target words (space-separated source text, then split) */
export function generateWords(opts: GenerateOptions): string[] {
  const { lesson, lang } = opts;

  if (lesson.mode === "sentence") {
    const pool = lang === "en" ? SENTENCES.en : SENTENCES.id;
    const s = pool[Math.floor(Math.random() * pool.length)];
    return s.split(" ").filter(Boolean);
  }

  const focusKeys = lesson.focus.filter((k) => /[a-z]/.test(k));

  // If this is a drill stage with <= 2 focus letters, generate strictly unique letter patterns
  if (lesson.mode === "drill" && focusKeys.length <= 2) {
    const target = lesson.count > 0 ? lesson.count : MIN_DRILL_COUNT;
    return generateLetterCombos(focusKeys, target);
  }

  // For 3+ letters, use real words from dictionary restricted to learned keys
  const allowed = new Set(
    (lesson.mode === "drill" ? lesson.focus : lesson.keys).filter((k) =>
      /[a-z]/.test(k),
    ),
  );

  const pool = Array.from(
    new Set(HOME_WORDS.filter((w) => [...w].every((c) => allowed.has(c)))),
  );
  const usable = pool.length > 0 ? pool : Array.from(new Set(HOME_WORDS));

  if (lesson.mode === "drill") {
    const target = lesson.count > 0 ? lesson.count : MIN_DRILL_COUNT;
    // Strictly UNIQUE combos only - take at most `target` items without repeating
    return usable.slice(0, Math.min(target, usable.length));
  }

  const out: string[] = [];
  const available = [...usable];
  for (let i = 0; i < lesson.count && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    out.push(available[idx]);
    available.splice(idx, 1);
  }
  return out;
}
