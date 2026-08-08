export type Language = "en" | "id";

export const langs: { id: Language; label: string }[] = [
  { id: "en", label: "English" },
  { id: "id", label: "Bahasa Indonesia" },
];

export const messages = {
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
      wpm: "WPM",
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
  lessons: { title: string; subtitle: string; completed: string; locked: string; best: string };
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
  review: { title: string; subtitle: string; nothing: string; done: string; back: string };
  results: { wpm: string; accuracy: string; stars: string };
  settings: { title: string; language: string };
  footer: { made: string };
  common: { back: string };
};

// runes-based reactive language store
let current: Language = "en";
const listeners = new Set<() => void>();

export function getLang(): Language {
  return current;
}

export function setLang(lang: Language) {
  current = lang;
  listeners.forEach((fn) => fn());
}

export function subscribeLang(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function t(): Messages {
  return messages[current];
}
