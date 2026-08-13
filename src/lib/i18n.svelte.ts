import type { LanguageCode } from "./dictionaries";

export type Language = LanguageCode;

export const langs: { id: Language; label: string; code: string }[] = [
  { id: "en", label: "English", code: "EN" },
  { id: "id", label: "Bahasa Indonesia", code: "ID" },
  { id: "es", label: "Español", code: "ES" },
  { id: "de", label: "Deutsch", code: "DE" },
  { id: "ru", label: "Русский", code: "RU" },
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
      heroBadge: "Touch-Typing Coach",
      heroTitle: "Master 10-Finger Typing Without Looking.",
      feature1Title: "Structured Zone Path",
      feature1Desc: "13 progressive stages covering left hand, right hand, and full keyboard mastery.",
      feature2Title: "Smart SRS System",
      feature2Desc: "Intelligent spaced repetition schedules reviews for weak keys automatically.",
      feature3Title: "3-Star Objectives",
      feature3Desc: "Hit 95% accuracy and target speed thresholds to earn 3 stars on every stage.",
      ctaTitle: "Ready to boost your typing speed?",
      ctaBtn: "Start Learning Now",
      interactiveCoach: "Interactive Coach",
      leftHand: "Left Hand",
      rightHand: "Right Hand",
      stageCount: "{n} Stages",
      featureTagline: "Keycoach Features",
      featureSectionTitle: "Why Learn with Keycoach?",
      allDone: "All lessons completed!",
      keepPracticing: "Keep practicing to unlock new stages.",
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
      soundTheme: "Sound Theme",
      soundMech: "Mechanical",
      soundArcade: "Arcade Bleeps",
      soundType: "Typewriter",
      soundSilent: "Silent",
    },
    footer: {
      made: "Built with SvelteKit",
      quickLinks: "Navigation",
      rights: "All rights reserved.",
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
      heroBadge: "Pelatih Mengetik 10 Jari",
      heroTitle: "Kuasai Mengetik 10 Jari Tanpa Perlu Melirik.",
      feature1Title: "Kurikulum Zona Terstruktur",
      feature1Desc: "13 stage bertahap mencakup tangan kiri, tangan kanan, dan penggabungan seluruh keyboard.",
      feature2Title: "Algoritma SRS Pintar",
      feature2Desc: "Pengulangan otomatis berbasis waktu untuk memperkuat tombol yang sering salah.",
      feature3Title: "Sistem Target 3 Bintang",
      feature3Desc: "Tantang dirimu mencapai akurasi 95% dan target KPM di setiap pelajaran.",
      ctaTitle: "Siap mengetik lebih cepat dan akurat?",
      ctaBtn: "Mulai Belajar Sekarang",
      interactiveCoach: "Pelatih Interaktif",
      leftHand: "Tangan Kiri",
      rightHand: "Tangan Kanan",
      stageCount: "{n} Stage",
      featureTagline: "Fitur Keycoach",
      featureSectionTitle: "Mengapa Belajar di Keycoach?",
      allDone: "Semua pelajaran selesai!",
      keepPracticing: "Teruskan latihanmu untuk membuka stage baru.",
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
      soundTheme: "Tema Suara",
      soundMech: "Mekanikal",
      soundArcade: "Arcade Bleeps",
      soundType: "Mesin Tik",
      soundSilent: "Hening",
    },
    footer: {
      made: "Dibangun dengan SvelteKit",
      quickLinks: "Navigasi",
      rights: "Hak cipta dilindungi.",
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
      heroBadge: "Entrenador de Mecanografía",
      heroTitle: "Domina la Mecanografía de 10 Dedos Sin Mirar.",
      feature1Title: "Ruta Estructurada por Zonas",
      feature1Desc: "13 etapas progresivas para mano izquierda, mano derecha y teclado completo.",
      feature2Title: "Sistema SRS Inteligente",
      feature2Desc: "Repetición espaciada automática para reforzar las teclas difíciles.",
      feature3Title: "Objetivos de 3 Estrellas",
      feature3Desc: "Alcanza el 95% de precisión y velocidad objetivo en cada nivel.",
      ctaTitle: "¿Listo para escribir más rápido?",
      ctaBtn: "Empieza a Aprender Ahora",
      interactiveCoach: "Entrenador Interactivo",
      leftHand: "Mano Izquierda",
      rightHand: "Mano Derecha",
      stageCount: "{n} Etapas",
      featureTagline: "Características de Keycoach",
      featureSectionTitle: "¿Por qué aprender con Keycoach?",
      allDone: "¡Todas las lecciones completadas!",
      keepPracticing: "Sigue practicando para desbloquear nuevas etapas.",
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
      soundTheme: "Tema de sonido",
      soundMech: "Mecánico",
      soundArcade: "Arcade Bleeps",
      soundType: "Máquina de escribir",
      soundSilent: "Silencio",
    },
    footer: {
      made: "Creado con SvelteKit",
      quickLinks: "Navegación",
      rights: "Todos los derechos reservados.",
    },
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
      heroBadge: "Moderner Tipptrainer",
      heroTitle: "Meistere das 10-Finger-Tippen ohne Hinsehen.",
      feature1Title: "Strukturierter Zonenpfad",
      feature1Desc: "13 Stufen für linke Hand, rechte Hand und das gesamte Keyboard.",
      feature2Title: "Intelligentes SRS-System",
      feature2Desc: "Automatische Wiederholungen für schwierige Tasten.",
      feature3Title: "3-Sterne-Ziele",
      feature3Desc: "Erreiche 95% Genauigkeit und Zielgeschwindigkeit für 3 Sterne.",
      ctaTitle: "Bereit, schneller zu tippen?",
      ctaBtn: "Jetzt Lernen Starten",
      interactiveCoach: "Interaktiver Trainer",
      leftHand: "Linke Hand",
      rightHand: "Rechte Hand",
      stageCount: "{n} Stufen",
      featureTagline: "Keycoach-Funktionen",
      featureSectionTitle: "Warum mit Keycoach lernen?",
      allDone: "Alle Lektionen abgeschlossen!",
      keepPracticing: "Übe weiter, um neue Stufen freizuschalten.",
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
      soundTheme: "Sound-Thema",
      soundMech: "Mechanisch",
      soundArcade: "Arcade Bleeps",
      soundType: "Schreibmaschine",
      soundSilent: "Stumm",
    },
    footer: {
      made: "Erstellt mit SvelteKit",
      quickLinks: "Navigation",
      rights: "Alle Rechte vorbehalten.",
    },
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
      heroBadge: "Тренер Слепой Печати",
      heroTitle: "Освойте 10-Пальцевую Печать Не Глядя.",
      feature1Title: "Зональная Система Обучения",
      feature1Desc: "13 этапов: левая рука, правая рука и вся клавиатура.",
      feature2Title: "Умная Система SRS",
      feature2Desc: "Автоматическое повторение сложных клавиш по интервалам.",
      feature3Title: "3-Звездные Цели",
      feature3Desc: "Достигайте 95% точности и целевой скорости на каждом уроке.",
      ctaTitle: "Готовы печатать быстрее?",
      ctaBtn: "Начать Обучение Сейчас",
      interactiveCoach: "Интерактивный Тренер",
      leftHand: "Левая Рука",
      rightHand: "Правая Рука",
      stageCount: "{n} Этапов",
      featureTagline: "Возможности Keycoach",
      featureSectionTitle: "Почему именно Keycoach?",
      allDone: "Все уроки пройдены!",
      keepPracticing: "Продолжайте заниматься, чтобы открыть новые этапы.",
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
      danger: "Zona de peligro",
      resetTitle: "Сбросить весь прогресс",
      resetDesc: "Сбрасывает весь прогресс и статистику. Это действие нельзя отменить.",
      resetConfirm: "Вы точно уверены?",
      resetConfirmDesc: "Это навсегда удалит весь прогресс, статистику и сбросит расписание SRS. Действие нельзя отменить.",
      reset: "Сбросить прогресс",
      cancel: "Отмена",
      soundTheme: "Звуковая тема",
      soundMech: "Механическая",
      soundArcade: "Аркада",
      soundType: "Печатная машинка",
      soundSilent: "Без звука",
    },
    footer: {
      made: "Сделано на SvelteKit",
      quickLinks: "Навигация",
      rights: "Все права защищены.",
    },
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
    heroBadge: string;
    heroTitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    ctaTitle: string;
    ctaBtn: string;
    interactiveCoach: string;
    leftHand: string;
    rightHand: string;
    stageCount: string;
    featureTagline: string;
    featureSectionTitle: string;
    allDone: string;
    keepPracticing: string;
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
    soundTheme: string;
    soundMech: string;
    soundArcade: string;
    soundType: string;
    soundSilent: string;
  };
  footer: {
    made: string;
    quickLinks: string;
    rights: string;
  };
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
