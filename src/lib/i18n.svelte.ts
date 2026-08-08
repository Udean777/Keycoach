import type { LanguageCode } from "./dictionaries";

export type Language = LanguageCode;

export const langs: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "id", label: "Bahasa Indonesia" },
  { id: "es", label: "Español" },
  { id: "de", label: "Deutsch" },
  { id: "ru", label: "Русский" },
];

export const messages: Record<Language, any> = {
  en: {
    app: {
      name: "Keycoach",
      tagline: "Learn to touch type, one key at a time.",
    },
    nav: {
      home: "Home",
      lessons: "Lessons",
      review: "Review",
      settings: "Settings",
    },
    home: {
      title: "Keycoach",
      subtitle: "Your personal touch-typing coach.",
      overallProgress: "Overall progress",
      continue: "Continue",
      start: "Start learning",
      resume: "Resume",
      lesson: "Lesson",
      unlock: "Complete previous lessons to unlock.",
      dueReviews: "Due reviews",
    },
    lessons: {
      title: "Lessons",
      subtitle: "Master each key set, then move to the next stage.",
      completed: "Done",
      locked: "Locked",
      best: "Best",
    },
    lesson: {
      keys: "Keys",
      goals: "Type all the drills below.",
      done: "Lesson complete!",
      next: "Next lesson",
      again: "Try again",
      back: "All lessons",
      start: "Start typing to begin",
      wordsLeft: "words left",
      streak: "Streak",
    },
    review: {
      title: "Review",
      subtitle: "Keys you missed recently. Practice to strengthen them.",
      nothing: "Nothing due right now. Great job!",
      done: "Review complete!",
      back: "Back to home",
    },
    results: {
      wpm: "WPM",
      accuracy: "Accuracy",
      stars: "Stars",
    },
    settings: {
      title: "Settings",
      language: "Language",
    },
    footer: {
      made: "Built with SvelteKit",
    },
    common: { back: "Back" },
  },
  id: {
    app: {
      name: "Keycoach",
      tagline: "Belajar mengetik 10 jari, satu tombol demi satu tombol.",
    },
    nav: {
      home: "Beranda",
      lessons: "Pelajaran",
      review: "Review",
      settings: "Pengaturan",
    },
    home: {
      title: "Keycoach",
      subtitle: "Pelatih mengetik 10 jari personal Anda.",
      overallProgress: "Progres keseluruhan",
      continue: "Lanjutkan",
      start: "Mulai belajar",
      resume: "Lanjut",
      lesson: "Pelajaran",
      unlock: "Selesaikan pelajaran sebelumnya untuk membuka.",
      dueReviews: "Review tertunda",
    },
    lessons: {
      title: "Pelajaran",
      subtitle:
        "Kuasai setiap kombinasi tombol, lalu lanjut ke tahap berikutnya.",
      completed: "Selesai",
      locked: "Terkunci",
      best: "Terbaik",
    },
    lesson: {
      keys: "Tombol",
      goals: "Ketik semua latihan di bawah ini.",
      done: "Pelajaran selesai!",
      next: "Pelajaran berikutnya",
      again: "Coba lagi",
      back: "Semua pelajaran",
      start: "Mulai mengetik untuk memulai",
      wordsLeft: "kata tersisa",
      streak: "Rentetan",
    },
    review: {
      title: "Review",
      subtitle: "Tombol yang sering Anda lewatkan. Latihan untuk memperkuat.",
      nothing: "Tidak ada yang terjadwal sekarang. Bagus!",
      done: "Review selesai!",
      back: "Kembali ke beranda",
    },
    results: {
      wpm: "KPM",
      accuracy: "Akurasi",
      stars: "Bintang",
    },
    settings: {
      title: "Pengaturan",
      language: "Bahasa",
    },
    footer: {
      made: "Dibangun dengan SvelteKit",
    },
    common: { back: "Kembali" },
  },
  es: {
    app: {
      name: "Keycoach",
      tagline: "Aprende a escribir, una tecla a la vez.",
    },
    nav: {
      home: "Inicio",
      lessons: "Lecciones",
      review: "Repaso",
      settings: "Ajustes",
    },
    home: {
      title: "Keycoach",
      subtitle: "Tu entrenador personal de mecanografía.",
      overallProgress: "Progreso general",
      continue: "Continuar",
      start: "Empezar a aprender",
      resume: "Reanudar",
      lesson: "Lección",
      unlock: "Completa lecciones anteriores para desbloquear.",
      dueReviews: "Repasos pendientes",
    },
    lessons: {
      title: "Lecciones",
      subtitle: "Domina cada grupo de teclas.",
      completed: "Hecho",
      locked: "Bloqueado",
      best: "Mejor",
    },
    lesson: {
      keys: "Teclas",
      goals: "Escribe todo abajo.",
      done: "¡Lección completa!",
      next: "Siguiente lección",
      again: "Intentar de nuevo",
      back: "Todas las lecciones",
      start: "Empieza a escribir",
      wordsLeft: "palabras restantes",
      streak: "Racha",
    },
    review: {
      title: "Repaso",
      subtitle: "Teclas falladas recientemente.",
      nothing: "Nada pendiente. ¡Buen trabajo!",
      done: "¡Repaso completo!",
      back: "Volver al inicio",
    },
    results: { wpm: "PPM", accuracy: "Precisión", stars: "Estrellas" },
    settings: { title: "Ajustes", language: "Idioma" },
    footer: { made: "Creado con SvelteKit" },
    common: { back: "Volver" },
  },
  de: {
    app: { name: "Keycoach", tagline: "Tippen lernen, Taste für Taste." },
    nav: {
      home: "Start",
      lessons: "Lektionen",
      review: "Wiederholung",
      settings: "Einstellungen",
    },
    home: {
      title: "Keycoach",
      subtitle: "Dein persönlicher Tipptrainer.",
      overallProgress: "Gesamtfortschritt",
      continue: "Weiter",
      start: "Lernen beginnen",
      resume: "Fortsetzen",
      lesson: "Lektion",
      unlock: "Vorherige Lektionen abschließen.",
      dueReviews: "Fällige Wiederholungen",
    },
    lessons: {
      title: "Lektionen",
      subtitle: "Meistere jedes Tastenset.",
      completed: "Fertig",
      locked: "Gesperrt",
      best: "Beste",
    },
    lesson: {
      keys: "Tasten",
      goals: "Tippe alles unten.",
      done: "Lektion abgeschlossen!",
      next: "Nächste Lektion",
      again: "Nochmal",
      back: "Alle Lektionen",
      start: "Tippe, um zu beginnen",
      wordsLeft: "Wörter übrig",
      streak: "Serie",
    },
    review: {
      title: "Wiederholung",
      subtitle: "Kürzlich verfehlte Tasten.",
      nothing: "Nichts fällig. Tolle Arbeit!",
      done: "Wiederholung abgeschlossen!",
      back: "Zurück zum Start",
    },
    results: { wpm: "WPM", accuracy: "Genauigkeit", stars: "Sterne" },
    settings: { title: "Einstellungen", language: "Sprache" },
    footer: { made: "Erstellt mit SvelteKit" },
    common: { back: "Zurück" },
  },
  ru: {
    app: {
      name: "Keycoach",
      tagline: "Научитесь печатать, клавиша за клавишей.",
    },
    nav: {
      home: "Главная",
      lessons: "Уроки",
      review: "Повторение",
      settings: "Настройки",
    },
    home: {
      title: "Keycoach",
      subtitle: "Ваш личный тренер по слепой печати.",
      overallProgress: "Общий прогресс",
      continue: "Продолжить",
      start: "Начать обучение",
      resume: "Возобновить",
      lesson: "Урок",
      unlock: "Завершите предыдущие уроки для разблокировки.",
      dueReviews: "Необходимые повторения",
    },
    lessons: {
      title: "Уроки",
      subtitle: "Освойте каждый набор клавиш.",
      completed: "Готово",
      locked: "Заблокировано",
      best: "Лучший",
    },
    lesson: {
      keys: "Клавиши",
      goals: "Напечатайте всё ниже.",
      done: "Урок завершен!",
      next: "Следующий урок",
      again: "Попробовать снова",
      back: "Все уроки",
      start: "Начните печатать",
      wordsLeft: "слов осталось",
      streak: "Серия",
    },
    review: {
      title: "Повторение",
      subtitle: "Недавно пропущенные клавиши.",
      nothing: "Нет заданий. Отличная работа!",
      done: "Повторение завершено!",
      back: "На главную",
    },
    results: { wpm: "Сл/м", accuracy: "Точность", stars: "Звезды" },
    settings: { title: "Настройки", language: "Язык" },
    footer: { made: "Сделано на SvelteKit" },
    common: { back: "Назад" },
  },
} as const;

export type Messages = {
  app: { name: string; tagline: string };
  nav: { home: string; lessons: string; review: string; settings: string };
  home: {
    title: string;
    subtitle: string;
    overallProgress: string;
    continue: string;
    start: string;
    resume: string;
    lesson: string;
    unlock: string;
    dueReviews: string;
  };
  lessons: {
    title: string;
    subtitle: string;
    completed: string;
    locked: string;
    best: string;
  };
  lesson: {
    keys: string;
    goals: string;
    done: string;
    next: string;
    again: string;
    back: string;
    start: string;
    wordsLeft: string;
    streak: string;
  };
  review: {
    title: string;
    subtitle: string;
    nothing: string;
    done: string;
    back: string;
  };
  results: { wpm: string; accuracy: string; stars: string };
  settings: { title: string; language: string };
  footer: { made: string };
  common: { back: string };
};

// runes-based reactive language store
let current: Language = $state("en");

if (typeof window !== "undefined") {
  const saved = localStorage.getItem("lang") as Language;
  if (saved && langs.some((l) => l.id === saved)) {
    current = saved;
  }
}

export function getLang(): Language {
  return current;
}

export function setLang(lang: Language) {
  current = lang;
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang);
  }
}

export function t(): Messages {
  return messages[current];
}
