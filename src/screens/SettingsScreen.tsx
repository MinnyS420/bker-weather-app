import React, { useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PRIVACY_POLICY_URL =
  'https://minnys420.github.io/bker-weather-app/privacy.html';

import { COLORS } from '../components/theme';
import { LANGUAGES } from '../i18n';
import { useSettings } from '../i18n/SettingsContext';
import type { GeoLocation } from '../types/location';
import { formatTime } from '../utils/format';

function Stepper({
  label,
  value,
  onDecrease,
  onIncrease,
}: {
  label: string;
  value: string;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperRow}>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={onDecrease}
          accessibilityRole="button">
          <Text style={styles.stepperButtonText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={onIncrease}
          accessibilityRole="button">
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SettingsScreen({
  location,
}: {
  location: GeoLocation | null;
}) {
  const { settings, t, setLanguage, setBriefingTime } = useSettings();
  const [languageOpen, setLanguageOpen] = useState(false);
  const selectedLanguage =
    LANGUAGES.find(language => language.code === settings.language) ??
    LANGUAGES[0];

  const bumpHour = (delta: number) => {
    const next = (settings.briefingHour + delta + 24) % 24;
    setBriefingTime(next, settings.briefingMinute).catch(() => undefined);
  };

  const bumpMinute = (delta: number) => {
    const next = (settings.briefingMinute + delta + 60) % 60;
    setBriefingTime(settings.briefingHour, next).catch(() => undefined);
  };

  return (
    <View>
      <Text style={[styles.sectionLabel, styles.sectionLabelFirst]}>
        {t('settings.timeTitle')}
      </Text>
      <View style={styles.card}>
        <Text style={styles.clock}>
          {formatTime(settings.briefingHour, settings.briefingMinute)}
        </Text>
        <Text style={styles.hint}>{t('settings.timeHint')}</Text>
        <View style={styles.stepperPair}>
          <Stepper
            label={t('settings.hour')}
            value={String(settings.briefingHour).padStart(2, '0')}
            onDecrease={() => bumpHour(-1)}
            onIncrease={() => bumpHour(1)}
          />
          <Stepper
            label={t('settings.minute')}
            value={String(settings.briefingMinute).padStart(2, '0')}
            onDecrease={() => bumpMinute(-1)}
            onIncrease={() => bumpMinute(1)}
          />
        </View>
      </View>

      <Text style={styles.sectionLabel}>{t('settings.languageTitle')}</Text>
      <Text style={styles.sectionHint}>{t('settings.languageHint')}</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setLanguageOpen(open => !open)}
          accessibilityRole="button"
          accessibilityState={{ expanded: languageOpen }}>
          <Text style={styles.flag}>{selectedLanguage.flag}</Text>
          <Text style={styles.languageName}>{selectedLanguage.name}</Text>
          <Text style={styles.chevron}>{languageOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {languageOpen
          ? LANGUAGES.map(language => {
              const selected = language.code === selectedLanguage.code;
              return (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageRow}
                  onPress={() => {
                    setLanguageOpen(false);
                    setLanguage(language.code).catch(() => undefined);
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}>
                  <Text style={styles.flag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                  {selected ? <Text style={styles.check}>✓</Text> : null}
                </TouchableOpacity>
              );
            })
          : null}
      </View>

      <Text style={styles.sectionLabel}>{t('settings.locationTitle')}</Text>
      <View style={styles.card}>
        <Text style={styles.locationLabel}>{location?.label ?? '—'}</Text>
        <Text style={styles.hint}>{t('settings.locationHint')}</Text>
        {location?.isFallback ? (
          <Text style={styles.fallback}>{t('settings.usingFallback')}</Text>
        ) : null}
      </View>

      <Text style={styles.sectionLabel}>{t('settings.privacyTitle')}</Text>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(PRIVACY_POLICY_URL).catch(() => undefined);
          }}
          accessibilityRole="link">
          <Text style={styles.privacyLink}>{t('settings.privacyLink')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: 26,
    marginBottom: 12,
  },
  sectionLabelFirst: {
    marginTop: 4,
  },
  sectionHint: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: -6,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  clock: {
    color: COLORS.textPrimary,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
  },
  hint: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  stepperPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 12,
  },
  stepper: {
    flex: 1,
    alignItems: 'center',
  },
  stepperLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '700',
  },
  stepperValue: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    minWidth: 48,
    textAlign: 'center',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  check: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '800',
  },
  flag: {
    fontSize: 26,
    marginRight: 12,
  },
  languageName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  chevron: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginLeft: 8,
  },
  locationLabel: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  fallback: {
    color: COLORS.warningText,
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
  },
  privacyLink: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
