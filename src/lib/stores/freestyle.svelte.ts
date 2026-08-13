import { browser } from "$app/environment";

export type FreestyleRecord = {
  wpm: number;
  accuracy: number;
  timestamp: number;
};

const FREESTYLE_STORAGE_KEY = "keycoach_freestyle_records";

class FreestyleStore {
  records = $state<FreestyleRecord[]>([]);
  loaded = $state(false);

  load() {
    if (!browser || this.loaded) return;
    try {
      const stored = localStorage.getItem(FREESTYLE_STORAGE_KEY);
      if (stored) {
        this.records = JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to load freestyle records", e);
    }
    this.loaded = true;
  }

  saveRecord(wpm: number, accuracy: number) {
    if (!browser) return;
    const newRecord: FreestyleRecord = {
      wpm,
      accuracy,
      timestamp: Date.now(),
    };
    this.records = [newRecord, ...this.records].slice(0, 50); // keep last 50
    try {
      localStorage.setItem(FREESTYLE_STORAGE_KEY, JSON.stringify(this.records));
    } catch (e) {
      console.error("Failed to save freestyle records", e);
    }
  }

  get personalBestWpm() {
    if (this.records.length === 0) return 0;
    return Math.max(...this.records.map((r) => r.wpm));
  }
}

export const freestyle = new FreestyleStore();
