/**
 * Lightweight Leitner-inspired spaced repetition for individual keys.
 *
 * Each key has a box (0..MAX_BOX). Correct streak advances the box and grows
 * the review interval; an error drops the key back to box 0 (review again soon).
 * Keys with `nextReviewAt` in the past are "due" and get weighted higher when
 * generating practice text.
 */

export const MAX_BOX = 5;

/** review interval (ms) per box after reaching it */
export const BOX_INTERVAL = [
  0, // box 0: always due (recently failed)
  60_000 * 5, // 5 min
  60_000 * 30, // 30 min
  60_000 * 60 * 6, // 6 h
  60_000 * 60 * 24, // 1 d
  60_000 * 60 * 24 * 7, // 7 d
] as const;

export interface KeyState {
  /** lowercase char */
  key: string;
  box: number;
  correctStreak: number;
  errorCount: number;
  lastSeenAt: number | null;
  nextReviewAt: number | null;
}

export function newKeyState(key: string): KeyState {
  return {
    key,
    box: 0,
    correctStreak: 0,
    errorCount: 0,
    lastSeenAt: null,
    nextReviewAt: null,
  };
}

/** Apply a single press outcome to a key's SRS state. `now` is epoch ms. */
export function applyOutcome(
  s: KeyState,
  correct: boolean,
  now: number,
): KeyState {
  if (correct) {
    const streak = s.correctStreak + 1;
    const box = Math.min(s.box + (streak >= 2 ? 1 : 0), MAX_BOX);
    const interval = BOX_INTERVAL[box];
    return {
      ...s,
      box,
      correctStreak: streak,
      lastSeenAt: now,
      nextReviewAt: now + interval,
    };
  }
  return {
    ...s,
    box: 0,
    correctStreak: 0,
    errorCount: s.errorCount + 1,
    lastSeenAt: now,
    nextReviewAt: now + BOX_INTERVAL[0],
  };
}

/** keys whose nextReviewAt has passed — or never seen → immediately due */
export function dueKeys(
  states: Map<string, KeyState>,
  keys: string[],
  now: number,
): KeyState[] {
  return [...states.values()].filter((s) => {
    if (!keys.includes(s.key)) return false;
    if (s.nextReviewAt === null) return true;
    return s.nextReviewAt <= now;
  });
}

/** merge two maps (local vs server / new session vs persisted) keeping worst box */
export function mergeKeyStates(
  a: Map<string, KeyState>,
  b: Map<string, KeyState>,
): Map<string, KeyState> {
  const out = new Map<string, KeyState>(a);
  for (const [k, sb] of b) {
    const sa = out.get(k);
    if (!sa) {
      out.set(k, sb);
      continue;
    }
    // keep the one that needs more review (lower box), higher errorCount
    const keep = sa.box <= sb.box && sa.errorCount >= sb.errorCount ? sa : sb;
    out.set(k, { ...keep, key: k });
  }
  return out;
}
