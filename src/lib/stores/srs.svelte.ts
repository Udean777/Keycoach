import type { Language } from "$lib/i18n.svelte";
import { getSrs, putSrs } from "../db";
import { applyOutcome, newKeyState, type KeyState } from "../srs/srs";

/**
 * Reactive SRS store (runes). Per-language map of key -> KeyState, mirrored to
 * IndexedDB. Records press outcomes from typing sessions.
 *
 * Kept as a single $state object: svelte-check rejects multiple $state runes in
 * one runes module (bogus "Expected token }" parse error in importers).
 */

function createSrsStore() {
  let state = $state<{ lang: Language; keys: Map<string, KeyState> }>({
    lang: "en",
    keys: new Map(),
  });

  /** ensure every learned key has an entry (so drills can weight them) */
  function ensure(keys: string[]) {
    let changed = false;
    const next = new Map(state.keys);
    for (const k of keys) {
      if (!next.has(k)) {
        next.set(k, newKeyState(k));
        changed = true;
      }
    }
    if (changed) {
      state = { ...state, keys: next };
      void persist();
    }
  }

  /** apply one press outcome to a target key */
  function record(target: string | null, correct: boolean, now = Date.now()) {
    if (target === null) return;
    const s = state.keys.get(target) ?? newKeyState(target);
    const next = applyOutcome(s, correct, now);
    const update = new Map(state.keys);
    update.set(target, next);
    state = { ...state, keys: update };
    void persist();
  }

  /** load a language's state from IndexedDB */
  async function load(l: Language) {
    try {
      const stored = await getSrs(l);
      state = {
        lang: l,
        keys:
          stored && stored.keys?.length
            ? new Map(stored.keys.map((k) => [k.key, k]))
            : new Map(),
      };
    } catch (err) {
      console.warn("Failed loading SRS store:", err);
      state = { lang: l, keys: new Map() };
    }
  }

  /** write-through to IndexedDB */
  async function persist() {
    await putSrs({ lang: state.lang, keys: [...state.keys.values()] });
  }

  return {
    get states() {
      return state.keys;
    },
    get lang() {
      return state.lang;
    },
    ensure,
    record,
    load,
  };
}

export const srs = createSrsStore();
