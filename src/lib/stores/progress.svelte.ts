import {
  getLessonProgress,
  getAllLessonProgress,
  putLessonProgress,
  clearAllProgress,
  type LessonProgress,
} from "../db";

/**
 * Reactive progress store (Svelte 5 runes). Backed by IndexedDB; exposes a
 * single `$state` map of lessonId -> progress so UI re-renders on change.
 */

export function createProgressStore() {
  let lessons = $state<Record<string, LessonProgress>>({});
  // load() is idempotent — store survives client-side navigation, so a page
  // mount must not re-fetch (that's the "page reloads on every nav" flash).
  let loaded = $state(false);

  async function load() {
    if (loaded) return;
    try {
      const all = await getAllLessonProgress();
      const map: Record<string, LessonProgress> = {};
      for (const p of all) map[p.lessonId] = p;
      lessons = map;
    } catch (err) {
      console.warn("Failed loading progress store:", err);
      lessons = {};
    }
    loaded = true;
  }

  async function save(lessonId: string, progress: LessonProgress) {
    lessons[lessonId] = progress;
    lessons = { ...lessons };
    try {
      await putLessonProgress(progress);
    } catch (err) {
      console.warn("Failed persisting lesson progress to DB:", err);
    }
  }

  function get(lessonId: string): LessonProgress | undefined {
    return lessons[lessonId];
  }

  function isUnlocked(lessonId: string, order: string[]): boolean {
    const idx = order.indexOf(lessonId);
    if (idx <= 0) return true;
    // all previous lessons must have >= 1 star
    return order.slice(0, idx).every((id) => (lessons[id]?.stars ?? 0) >= 1);
  }

  return {
    get lessons() {
      return lessons;
    },
    get loaded() {
      return loaded;
    },
    load,
    save,
    get,
    isUnlocked,
    async reset() {
      lessons = {};
      try {
        await clearAllProgress();
      } catch (err) {
        console.warn("Failed clearing progress from DB:", err);
      }
    }
  };
}

export const progress = createProgressStore();
