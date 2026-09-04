import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_LANGUAGE, type LanguageCode, LANGUAGES } from './types';

const STORAGE_KEY = 'mwg.settings.v1';

export const DEFAULT_BRIEFING_HOUR = 20;
export const DEFAULT_BRIEFING_MINUTE = 0;

export interface AppSettings {
  language: LanguageCode;
  briefingHour: number;
  briefingMinute: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  language: DEFAULT_LANGUAGE,
  briefingHour: DEFAULT_BRIEFING_HOUR,
  briefingMinute: DEFAULT_BRIEFING_MINUTE,
};

function clampHour(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_BRIEFING_HOUR;
  }
  return Math.min(23, Math.max(0, Math.round(value)));
}

function clampMinute(value: number): number {
  if (!Number.isFinite(value)) {
    return DEFAULT_BRIEFING_MINUTE;
  }
  return Math.min(59, Math.max(0, Math.round(value)));
}

function isLanguage(value: unknown): value is LanguageCode {
  return LANGUAGES.some(option => option.code === value);
}

export function parseSettings(raw: unknown): AppSettings {
  if (typeof raw !== 'object' || raw === null) {
    return DEFAULT_SETTINGS;
  }

  const candidate = raw as Partial<AppSettings>;

  return {
    language: isLanguage(candidate.language)
      ? candidate.language
      : DEFAULT_LANGUAGE,
    briefingHour: clampHour(
      typeof candidate.briefingHour === 'number'
        ? candidate.briefingHour
        : DEFAULT_BRIEFING_HOUR,
    ),
    briefingMinute: clampMinute(
      typeof candidate.briefingMinute === 'number'
        ? candidate.briefingMinute
        : DEFAULT_BRIEFING_MINUTE,
    ),
  };
}

export async function loadSettings(): Promise<AppSettings> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_SETTINGS;
    }
    return parseSettings(JSON.parse(stored));
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
