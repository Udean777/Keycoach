import {
  getLessonProgress,
  getAllLessonProgress,
  putLessonProgress,
  type LessonProgress,
} from "../db";

/**
 * Reactive progress store (Svelte 5 runes). Backed by IndexedDB; exposes a
 * single `$state` map of lessonId -> progress so UI re-renders on change.
 */

export function createProgressStore() {
  let lessons = $state<Record<string, LessonProgress>>({});

  async function load() {
    try {
      const all = await getAllLessonProgress();
      const map: Record<string, LessonProgress> = {};
      for (const p of all) map[p.lessonId] = p;
      lessons = map;
    } catch (err) {
      console.warn("Failed loading progress store:", err);
      lessons = {};
    }
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
    load,
    save,
    get,
    isUnlocked,
  };
}

export const progress = createProgressStore();
