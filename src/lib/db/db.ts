import { supabase } from "./supabase";
import type { KeyState } from "../srs/srs";

export interface LessonProgress {
  lessonId: string;
  stars: number; // 1-3, 0 = not done
  bestWpm: number;
  bestAccuracy: number;
  completedAt: number | null;
}

export interface SrsLangState {
  lang: string;
  keys: KeyState[];
}

// Fallback in-memory cache so app works immediately even before Supabase env vars are set
const memoryProgress: Record<string, LessonProgress> = {};
const memorySrs: Record<string, SrsLangState> = {};

export async function getLessonProgress(
  lessonId: string,
): Promise<LessonProgress | undefined> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("*")
        .eq("lesson_id", lessonId)
        .maybeSingle();

      if (!error && data) {
        return {
          lessonId: data.lesson_id,
          stars: data.stars,
          bestWpm: data.best_wpm,
          bestAccuracy: data.best_accuracy,
          completedAt: data.completed_at,
        };
      }
    } catch (err) {
      console.warn("Supabase fetch error for lesson progress:", err);
    }
  }
  return memoryProgress[lessonId];
}

export async function putLessonProgress(p: LessonProgress): Promise<void> {
  memoryProgress[p.lessonId] = p;
  if (supabase) {
    try {
      await supabase.from("lesson_progress").upsert({
        lesson_id: p.lessonId,
        stars: p.stars,
        best_wpm: p.bestWpm,
        best_accuracy: p.bestAccuracy,
        completed_at: p.completedAt,
      });
    } catch (err) {
      console.warn("Supabase upsert error for lesson progress:", err);
    }
  }
}

export async function clearAllProgress(): Promise<void> {
  for (const k in memoryProgress) delete memoryProgress[k];
  if (supabase) {
    try {
      await supabase.from("lesson_progress").delete().neq("lesson_id", "");
    } catch (err) {
      console.warn("Supabase delete error:", err);
    }
  }
}

export async function getAllLessonProgress(): Promise<LessonProgress[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from("lesson_progress").select("*");
      if (!error && data) {
        const list = data.map((d) => ({
          lessonId: d.lesson_id,
          stars: d.stars,
          bestWpm: d.best_wpm,
          bestAccuracy: d.best_accuracy,
          completedAt: d.completed_at,
        }));
        list.forEach((item) => {
          memoryProgress[item.lessonId] = item;
        });
        return list;
      }
    } catch (err) {
      console.warn("Supabase fetch all error for lesson progress:", err);
    }
  }
  return Object.values(memoryProgress);
}

export async function getSrs(lang: string): Promise<SrsLangState | undefined> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("srs_state")
        .select("*")
        .eq("lang", lang)
        .maybeSingle();

      if (!error && data) {
        return {
          lang: data.lang,
          keys: data.keys ?? [],
        };
      }
    } catch (err) {
      console.warn("Supabase fetch SRS error:", err);
    }
  }
  return memorySrs[lang];
}

export async function putSrs(s: SrsLangState): Promise<void> {
  memorySrs[s.lang] = s;
  if (supabase) {
    try {
      await supabase.from("srs_state").upsert({
        lang: s.lang,
        keys: s.keys,
      });
    } catch (err) {
      console.warn("Supabase upsert SRS error:", err);
    }
  }
}

export async function clearAllSrs(): Promise<void> {
  for (const k in memorySrs) delete memorySrs[k];
  if (supabase) {
    try {
      await supabase.from("srs_state").delete().neq("lang", "");
    } catch (err) {
      console.warn("Supabase delete SRS error:", err);
    }
  }
}
