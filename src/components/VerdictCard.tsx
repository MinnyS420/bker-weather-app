import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSettings } from '../i18n/SettingsContext';
import type { DailyOutlook } from '../types/weather';
import { formatForecastDate } from '../utils/format';
import { SEVERITY_THEME } from './theme';

export default function VerdictCard({ outlook }: { outlook: DailyOutlook }) {
  const { settings, t } = useSettings();
  const { forecast, evaluation, copy } = outlook;
  const theme = SEVERITY_THEME[evaluation.severity];

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: theme.badge }]} />
        <Text style={styles.label}>
          {t(`severity.${evaluation.severity}.label`)}
        </Text>
      </View>

      <Text style={styles.verdict}>
        {t(`severity.${evaluation.severity}.verdict`)}
      </Text>
      <Text style={styles.date}>
        {formatForecastDate(forecast.date, settings.language)}
      </Text>
      <Text style={styles.reason}>{copy.primaryReason}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    padding: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  verdict: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  date: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    marginTop: 6,
  },
  reason: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    lineHeight: 21,
    marginTop: 14,
  },
});
