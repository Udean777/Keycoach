import { describe, expect, it } from 'vitest';
import {
  MAX_BOX,
  applyOutcome,
  dueKeys,
  mergeKeyStates,
  newKeyState,
} from '$lib/srs/srs';

const NOW = 2_000_000;

describe('applyOutcome', () => {
  it('needs a 2-streak before advancing a box', () => {
    let s = newKeyState('a');
    s = applyOutcome(s, true, NOW); // streak 1 -> stays box 0
    expect(s.box).toBe(0);
    s = applyOutcome(s, true, NOW + 1000); // streak 2 -> box 1
    expect(s.box).toBe(1);
    expect(s.nextReviewAt).toBe(NOW + 1000 + 300_000); // 5 min
  });

  it('resets to box 0 on an error and bumps errorCount', () => {
    let s = applyOutcome(newKeyState('a'), true, NOW);
    s = applyOutcome(s, true, NOW + 1000);
    expect(s.box).toBe(1);
    s = applyOutcome(s, false, NOW + 2000);
    expect(s.box).toBe(0);
    expect(s.correctStreak).toBe(0);
    expect(s.errorCount).toBe(1);
  });

  it('caps the box at MAX_BOX', () => {
    let s = newKeyState('a');
    for (let i = 0; i < 40; i++) s = applyOutcome(s, true, NOW + i * 1000);
    expect(s.box).toBe(MAX_BOX);
  });
});

describe('dueKeys', () => {
  it('only returns keys that are in the requested set', () => {
    const map = new Map([
      [newKeyState('a').key, newKeyState('a')],
      [newKeyState('b').key, newKeyState('b')],
    ]);
    expect(dueKeys(map, ['a'], NOW).map((s) => s.key)).toEqual(['a']);
  });

  it('treats never-seen keys as due', () => {
    const map = new Map([[newKeyState('z').key, newKeyState('z')]]);
    expect(dueKeys(map, ['z'], NOW)).toHaveLength(1);
  });
});

describe('mergeKeyStates', () => {
  it('keeps the entry needing more review (lower box / higher error)', () => {
    const low = { ...newKeyState('a'), box: 0, errorCount: 3, nextReviewAt: 1 };
    const high = { ...newKeyState('a'), box: 4, errorCount: 0, nextReviewAt: 999 };
    const merged = mergeKeyStates(new Map([[low.key, low]]), new Map([[high.key, high]]));
    expect(merged.get('a')?.box).toBe(0);
    expect(merged.get('a')?.errorCount).toBe(3);
  });
});