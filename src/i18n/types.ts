export type LanguageCode = 'mk' | 'en' | 'de' | 'it' | 'fr' | 'ru' | 'sr';

export interface LanguageOption {
  code: LanguageCode;
  /** Flag emoji shown on the language row. */
  flag: string;
  /** Always English so the list is readable before the UI language changes. */
  name: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'mk', flag: '🇲🇰', name: 'Macedonian' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'German' },
  { code: 'it', flag: '🇮🇹', name: 'Italian' },
  { code: 'fr', flag: '🇫🇷', name: 'French' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian' },
  { code: 'sr', flag: '🇷🇸', name: 'Serbian' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'mk';

export interface DateNames {
  weekdays: string[];
  weekdaysShort: string[];
  months: string[];
  monthsShort: string[];
}

export type MessageVars = Record<string, string | number>;
