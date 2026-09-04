import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { makeTranslator, type TranslateFn } from './index';
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  type AppSettings,
} from './settingsStorage';
import type { LanguageCode } from './types';

interface SettingsContextValue {
  settings: AppSettings;
  ready: boolean;
  t: TranslateFn;
  setLanguage: (language: LanguageCode) => Promise<void>;
  setBriefingTime: (hour: number, minute: number) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadSettings().then(loaded => {
      if (!cancelled) {
        setSettings(loaded);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next: AppSettings) => {
    setSettings(next);
    try {
      await saveSettings(next);
    } catch {
      // Persistence failure must not freeze the UI; the choice still applies
      // for this session.
    }
  }, []);

  const setLanguage = useCallback(
    async (language: LanguageCode) => {
      await persist({ ...settings, language });
    },
    [persist, settings],
  );

  const setBriefingTime = useCallback(
    async (hour: number, minute: number) => {
      await persist({
        ...settings,
        briefingHour: hour,
        briefingMinute: minute,
      });
    },
    [persist, settings],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      ready,
      t: makeTranslator(settings.language),
      setLanguage,
      setBriefingTime,
    }),
    [settings, ready, setLanguage, setBriefingTime],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const value = useContext(SettingsContext);
  if (!value) {
    throw new Error('useSettings must be used inside SettingsProvider');
  }
  return value;
}
