import { describe, expect, it } from 'vitest';
import {
  initialState,
  applyPress,
  computeStats,
  errorCounts,
} from '$lib/engine/typing';

const T0 = 1_000_000;

describe('applyPress', () => {
  it('types a printable char into the current word', () => {
    let s = initialState(['as']);
    s = applyPress(s, 'a', T0);
    expect(s.typedWords[0]).toBe('a');
    expect(s.currentWordIndex).toBe(0);
    expect(s.keystrokes).toBe(1);
    expect(s.errors).toBe(0);
  });

  it('records an error for the wrong char and feeds errorCounts', () => {
    const s = applyPress(initialState(['as']), 'x', T0);
    // the engine keeps typing position: 'x' missed target 'a' at index 0
    expect(s.errors).toBe(1);
    expect(errorCounts(s)).toEqual({ a: 1 });
  });

  it('backspace removes a char in the current word', () => {
    let s = applyPress(initialState(['as']), 'a', T0);
    s = applyPress(s, 'Backspace', T0 + 10);
    expect(s.typedWords[0]).toBe('');
    expect(s.keystrokes).toBe(1); // backspace not counted as a keystroke
  });

  it('space advances to the next word only when typed', () => {
    let s = initialState(['as', 'we']);
    // space with empty current word is a no-op
    s = applyPress(s, ' ', T0);
    expect(s.currentWordIndex).toBe(0);
    s = applyPress(s, 'a', T0 + 10);
    s = applyPress(s, 's', T0 + 20);
    s = applyPress(s, ' ', T0 + 30);
    expect(s.currentWordIndex).toBe(1);
    expect(s.typedWords[1]).toBe('');
  });

  it('finishes when the last char of the last word is typed', () => {
    let s = initialState(['as']);
    s = applyPress(s, 'a', T0);
    s = applyPress(s, 's', T0 + 10);
    expect(s.finished).toBe(true);
  });

  it('is a no-op once finished', () => {
    let s = applyPress(initialState(['a']), 'a', T0);
    expect(s.finished).toBe(true);
    const frozen = applyPress(s, 'b', T0 + 10);
    expect(frozen.finished).toBe(true);
  });
});

describe('computeStats', () => {
  it('reports 0/100% before any key', () => {
    const s = computeStats(initialState(['as']));
    expect(s.wpm).toBe(0);
    expect(s.accuracy).toBe(100);
    expect(s.progress).toBe(0);
  });

  it('computes progress from all words combined', () => {
    let s = initialState(['as', 'ok']); // 4 chars
    s = applyPress(s, 'a', T0);
    s = applyPress(s, 's', T0 + 20);
    expect(computeStats(s).progress).toBeCloseTo(0.5);
  });

  it('accuracy is correct when all presses are correct', () => {
    let s = initialState(['as']);
    s = applyPress(s, 'a', T0);
    s = applyPress(s, 's', T0 + 20);
    expect(computeStats(s).accuracy).toBe(100);
  });

  it('accuracy dips with errors', () => {
    // 'a' correct, then 'x' misses position 1 ('s') -> 2 keys, 1 error = 50%
    let s = initialState(['as']);
    s = applyPress(s, 'a', T0);
    s = applyPress(s, 'x', T0 + 20);
    expect(computeStats(s).accuracy).toBe(50);
  });
});