/** Minimal, dependency-free typing engine shared by drill / word / sentence lessons. */

export interface Press {
  /** the target key this press aimed at (may be null on extra chars) */
  target: string | null;
  /** true if the typed char equals the target char */
  correct: boolean;
  /** ms since session start */
  time: number;
}

export interface TypingState {
  /** the ordered target words */
  words: string[];
  /** typed words so far (index aligned with currentWordIndex) */
  typedWords: string[];
  currentWordIndex: number;
  /** total keypresses */
  keystrokes: number;
  /** incorrect keypresses */
  errors: number;
  /** ms since start (0 until first key) */
  elapsed: number;
  /** epoch ms when session started (null until first key) */
  startedAt: number | null;
  /** all presses logged + char time, for SRS + live wpm */
  log: Press[];
  /** session is finished (all words completed) */
  finished: boolean;
}

export function initialState(words: string[]): TypingState {
  return {
    words,
    typedWords: [""],
    currentWordIndex: 0,
    keystrokes: 0,
    errors: 0,
    elapsed: 0,
    startedAt: null,
    log: [],
    finished: false,
  };
}

/**
 * Pure reducer: returns the next state after a single key press.
 * `now` is epoch ms, used for wiring start timing & dur.
 */
export function applyPress(
  state: TypingState,
  key: string,
  now: number,
): TypingState {
  // guard: no-op once finished / on modifiers handled upstream
  if (state.finished) return state;

  const startedAt = state.startedAt ?? now;
  const base = {
    ...state,
    startedAt,
    elapsed: now - startedAt,
    log: [...state.log],
  };

  const word = state.words[state.currentWordIndex] ?? "";
  const typed = state.typedWords[state.currentWordIndex] ?? "";
  const log = base.log;

  if (key === "Backspace") {
    if (typed.length > 0) {
      const typedWords = [...state.typedWords];
      typedWords[state.currentWordIndex] = typed.slice(0, -1);
      return { ...base, typedWords };
    }
    // move back to previous word if it was wrong (allow re-typing)
    if (state.currentWordIndex > 0) {
      const prevWord = state.words[state.currentWordIndex - 1];
      const prevTyped = state.typedWords[state.currentWordIndex - 1] ?? "";
      if (prevTyped !== prevWord) {
        const typedWords = state.typedWords.slice(0, state.currentWordIndex);
        // clear current then step back
        return {
          ...base,
          typedWords: [...typedWords, ""],
          currentWordIndex: state.currentWordIndex - 1,
        };
      }
    }
    return base;
  }

  if (key === " ") {
    // space only advances if the current word has been typed at least one char
    if (typed.length === 0) return base;
    const typedWords = [...state.typedWords];
    if (state.currentWordIndex === state.words.length - 1) {
      // last word done
      return { ...base, typedWords, finished: true };
    }
    typedWords.push("");
    const finished = state.currentWordIndex + 1 >= state.words.length;
    return {
      ...base,
      typedWords,
      currentWordIndex: state.currentWordIndex + 1,
      finished,
    };
  }

  // printable char — overwrite the first wrong char instead of appending, so
  // the user just retypes the correct key (no backspace needed)
  let fixIdx = 0;
  while (fixIdx < typed.length && typed[fixIdx] === word[fixIdx]) fixIdx++;
  const isOverwrite = fixIdx < typed.length;
  const nextTyped = isOverwrite ? typed.slice(0, fixIdx) + key : typed + key;
  const targetChar = isOverwrite ? word[fixIdx] : word[typed.length];
  const correct = targetChar != null && targetChar === key;
  const keystrokes = state.keystrokes + 1;
  const errors = state.errors + (correct ? 0 : 1);
  const typedWords = [...state.typedWords];
  typedWords[state.currentWordIndex] = nextTyped;
  log.push({ target: targetChar, correct, time: base.elapsed });

  // auto-finish if we completed the last word's last char
  const onLastWord = state.currentWordIndex === state.words.length - 1;
  const finished = onLastWord && nextTyped.length >= word.length;

  return { ...base, typedWords, keystrokes, errors, finished };
}

/** live stats — pure, testable */
export interface LiveStats {
  wpm: number;
  accuracy: number;
  progress: number; // 0..1
}

export function computeStats(state: TypingState): LiveStats {
  const totalChars = state.words.reduce((a, w) => a + w.length, 0);
  const typedChars = state.typedWords.reduce((a, w) => a + w.length, 0);
  const minutes = state.elapsed / 60000;
  const wpm =
    state.elapsed > 0 ? Math.round(state.keystrokes / 5 / minutes) : 0;
  const accuracy =
    state.keystrokes === 0
      ? 100
      : Math.round(
          ((state.keystrokes - state.errors) / state.keystrokes) * 100,
        );
  const progress = totalChars === 0 ? 0 : Math.min(1, typedChars / totalChars);
  return { wpm, accuracy, progress };
}

/** char-level error map for SRS: key -> error count in this session */
export function errorCounts(state: TypingState): Record<string, number> {
  const map: Record<string, number> = {};
  for (const p of state.log) {
    if (!p.correct && p.target) map[p.target] = (map[p.target] ?? 0) + 1;
  }
  return map;
}
