import type { LanguageCode } from "./dictionaries";

export type Language = LanguageCode;

export const langs: { id: Language; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "de", label: "Deutsch", flag: "🇩🇪" },
  { id: "ru", label: "Русский", flag: "🇷🇺" },
];

export const messages: Record<Language, any> = {
  en: {
    app: {
      name: "Keycoach",
      tagline: "Build your touch-typing instincts. Type faster without looking.",
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
      eyebrow: "Lesson path",
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
      eyebrow: "SRS due",
    },
    results: {
      wpm: "WPM",
      accuracy: "Accuracy",
      stars: "Stars",
      objectives: "Objectives",
      objAcc80: "Accuracy ≥ 80%",
      objAcc95: "Accuracy ≥ 95%",
      objWpm: "Speed ≥ {wpm} WPM",
    },
    settings: {
      title: "Settings",
      language: "Language",
      preferences: "Preferences",
      danger: "Danger zone",
      resetTitle: "Reset all your progress",
      resetDesc:
        "Reset all your progress and typing statistics. This action cannot be undone.",
      resetConfirm: "Are you absolutely sure?",
      resetConfirmDesc:
        "This will permanently delete all your progress, typing statistics, and reset the SRS schedule. This action cannot be undone.",
      reset: "Reset progress",
      cancel: "Cancel",
    },
    footer: {
      made: "Built with SvelteKit",
    },
    common: { back: "Back" },
  },
  id: {
    app: {
      name: "Keycoach",
      tagline: "Latih insting ngetik 10 jarimu biar makin ngebut tanpa perlu melirik.",
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
      eyebrow: "Jalur pelajaran",
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
      eyebrow: "Jatuh tempo SRS",
    },
    results: {
      wpm: "KPM",
      accuracy: "Akurasi",
      stars: "Bintang",
      objectives: "Target",
      objAcc80: "Akurasi ≥ 80%",
      objAcc95: "Akurasi ≥ 95%",
      objWpm: "Kecepatan ≥ {wpm} KPM",
    },
    settings: {
      title: "Pengaturan",
      language: "Bahasa",
      preferences: "Preferensi",
      danger: "Zona bahaya",
      resetTitle: "Reset semua progres",
      resetDesc:
        "Reset semua progres dan statistik pengetikan Anda. Tindakan ini tidak dapat dibatalkan.",
      resetConfirm: "Anda yakin?",
      resetConfirmDesc:
        "Ini akan menghapus permanen semua progres, statistik pengetikan, dan menyetel ulang jadwal SRS. Tindakan ini tidak dapat dibatalkan.",
      reset: "Reset progres",
      cancel: "Batal",
    },
    footer: {
      made: "Dibangun dengan SvelteKit",
    },
    common: { back: "Kembali" },
  },
  es: {
    app: {
      name: "Keycoach",
      tagline: "Desarrolla tu instinto para mecanografiar más rápido sin mirar el teclado.",
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
      eyebrow: "Ruta de lecciones",
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
      eyebrow: "Vencidos SRS",
    },
    results: { wpm: "PPM", accuracy: "Precisión", stars: "Estrellas", objectives: "Objetivos", objAcc80: "Precisión ≥ 80%", objAcc95: "Precisión ≥ 95%", objWpm: "Velocidad ≥ {wpm} PPM" },
    settings: { title: "Ajustes", language: "Idioma", preferences: "Preferencias",
      danger: "Zona de peligro",
      resetTitle: "Reiniciar todo el progreso",
      resetDesc: "Reinicia todo el progreso y estadísticas. Esta acción no se puede deshacer.",
      resetConfirm: "¿Estás totalmente seguro?",
      resetConfirmDesc: "Esto eliminará permanentemente todo el progreso, estadísticas y restablecerá el calendario SRS. Esta acción no se puede deshacer.",
      reset: "Reiniciar progreso",
      cancel: "Cancelar",
    },
    footer: { made: "Creado con SvelteKit" },
    common: { back: "Volver" },
  },
  de: {
    app: { name: "Keycoach", tagline: "Trainiere deinen Tipp-Instinkt, um schneller zu tippen, ohne hinzusehen." },
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
      eyebrow: "Lektionspfad",
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
      eyebrow: "SRS fällig",
    },
    results: { wpm: "WPM", accuracy: "Genauigkeit", stars: "Sterne", objectives: "Ziele", objAcc80: "Genauigkeit ≥ 80%", objAcc95: "Genauigkeit ≥ 95%", objWpm: "Geschwindigkeit ≥ {wpm} WPM" },
    settings: { title: "Einstellungen", language: "Sprache", preferences: "Einstellungen",
      danger: "Gefahrenzone",
      resetTitle: "Gesamten Fortschritt zurücksetzen",
      resetDesc: "Setzt den gesamten Fortschritt und die Statistik zurück. Dies kann nicht rückgängig gemacht werden.",
      resetConfirm: "Sind Sie ganz sicher?",
      resetConfirmDesc: "Dies löscht dauerhaft den gesamten Fortschritt, die Statistik und setzt den SRS-Plan zurück. Diese Aktion kann nicht rückgängig gemacht werden.",
      reset: "Fortschritt zurücksetzen",
      cancel: "Abbrechen",
    },
    footer: { made: "Erstellt mit SvelteKit" },
    common: { back: "Zurück" },
  },
  ru: {
    app: {
      name: "Keycoach",
      tagline: "Тренируйте инстинкт слепой печати, чтобы набирать текст быстрее и не глядя.",
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
      eyebrow: "Путь уроков",
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
      eyebrow: "Сдача SRS",
    },
    results: { wpm: "Сл/м", accuracy: "Точность", stars: "Звезды", objectives: "Цели", objAcc80: "Точность ≥ 80%", objAcc95: "Точность ≥ 95%", objWpm: "Скорость ≥ {wpm} Сл/м" },
    settings: { title: "Настройки", language: "Язык", preferences: "Предпочтения",
      danger: "Опасная зона",
      resetTitle: "Сбросить весь прогресс",
      resetDesc: "Сбрасывает весь прогресс и статистику. Это действие нельзя отменить.",
      resetConfirm: "Вы точно уверены?",
      resetConfirmDesc: "Это навсегда удалит весь прогресс, статистику и сбросит расписание SRS. Действие нельзя отменить.",
      reset: "Сбросить прогресс",
      cancel: "Отмена",
    },
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
    eyebrow: string;
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
    eyebrow: string;
  };
  results: { wpm: string; accuracy: string; stars: string; objectives: string; objAcc80: string; objAcc95: string; objWpm: string };
  settings: {
    title: string;
    language: string;
    preferences: string;
    danger: string;
    resetTitle: string;
    resetDesc: string;
    resetConfirm: string;
    resetConfirmDesc: string;
    reset: string;
    cancel: string;
  };
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
