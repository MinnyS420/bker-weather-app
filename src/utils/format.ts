/**
 * Date formatting that takes its month/weekday names from the active language.
 *
 * Written by hand rather than via `Intl`, because Hermes ships without full
 * ICU data on some Android builds and would silently fall back to English.
 */

import { dateNamesFor, type LanguageCode } from '../i18n';

const pad = (value: number): string => String(value).padStart(2, '0');

/**
 * Parses `YYYY-MM-DD` as a *local* date. Passing the string to `new Date()`
 * directly would treat it as UTC and shift the weekday for anyone east of
 * Greenwich.
 */
function parseIsoDate(isoDate: string): Date | null {
  const [year, month, day] = isoDate.split('-').map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

/** `2026-09-05` -> `Saturday, 5 September` (in the active language). */
export function formatForecastDate(
  isoDate: string,
  language: LanguageCode,
): string {
  const date = parseIsoDate(isoDate);

  if (!date) {
    return isoDate;
  }

  const names = dateNamesFor(language);
  return `${names.weekdays[date.getDay()]}, ${date.getDate()} ${
    names.months[date.getMonth()]
  }`;
}

export function formatWeekdayShort(
  isoDate: string,
  language: LanguageCode,
): string {
  const date = parseIsoDate(isoDate);
  return date ? dateNamesFor(language).weekdaysShort[date.getDay()] : isoDate;
}

export function formatDayAndMonthShort(
  isoDate: string,
  language: LanguageCode,
): string {
  const date = parseIsoDate(isoDate);
  if (!date) {
    return isoDate;
  }
  return `${date.getDate()} ${dateNamesFor(language).monthsShort[date.getMonth()]}`;
}

export function formatClock(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatTime(hour: number, minute: number): string {
  return `${pad(hour)}:${pad(minute)}`;
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}
