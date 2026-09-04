import { DATE_NAMES, MESSAGES } from './translations';
import type { DateNames, LanguageCode, MessageVars } from './types';

export type TranslateFn = (key: string, vars?: MessageVars) => string;

function interpolate(template: string, vars?: MessageVars): string {
  if (!vars) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    vars[name] === undefined ? whole : String(vars[name]),
  );
}

export function translate(
  language: LanguageCode,
  key: string,
  vars?: MessageVars,
): string {
  const table = MESSAGES[language] ?? MESSAGES.mk;
  const template = table[key] ?? MESSAGES.en[key] ?? key;
  return interpolate(template, vars);
}

export function makeTranslator(language: LanguageCode): TranslateFn {
  return (key, vars) => translate(language, key, vars);
}

export function dateNamesFor(language: LanguageCode): DateNames {
  return DATE_NAMES[language] ?? DATE_NAMES.en;
}

export { LANGUAGES, DEFAULT_LANGUAGE } from './types';
export type { LanguageCode, LanguageOption, MessageVars } from './types';
