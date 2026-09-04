import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSettings } from '../i18n/SettingsContext';
import type { DailyOutlook } from '../types/weather';
import MetricGrid from './MetricGrid';
import VerdictCard from './VerdictCard';
import { COLORS, SEVERITY_THEME } from './theme';

export default function DayDetail({
  outlook,
  children,
}: {
  outlook: DailyOutlook;
  children?: React.ReactNode;
}) {
  const { t } = useSettings();
  const theme = SEVERITY_THEME[outlook.evaluation.severity];

  return (
    <View>
      <VerdictCard outlook={outlook} />

      <Text style={styles.sectionLabel}>{t('metrics')}</Text>
      <MetricGrid forecast={outlook.forecast} />

      <Text style={styles.sectionLabel}>{t('details')}</Text>
      <View style={styles.detailsCard}>
        {outlook.copy.details.map(detail => (
          <View key={detail} style={styles.detailRow}>
            <View style={[styles.detailDot, { backgroundColor: theme.badge }]} />
            <Text style={styles.detailText}>{detail}</Text>
          </View>
        ))}
      </View>

      {children}
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
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 10,
  },
  detailText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
