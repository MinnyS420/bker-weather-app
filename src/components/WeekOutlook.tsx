import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSettings } from '../i18n/SettingsContext';
import type { DailyOutlook } from '../types/weather';
import {
  formatDayAndMonthShort,
  formatWeekdayShort,
} from '../utils/format';
import { COLORS, SEVERITY_THEME } from './theme';

interface WeekRowProps {
  outlook: DailyOutlook;
  index: number;
  isLast: boolean;
}

function WeekRow({ outlook, index, isLast }: WeekRowProps) {
  const { settings, t } = useSettings();
  const { forecast, evaluation } = outlook;
  const theme = SEVERITY_THEME[evaluation.severity];
  const relativeLabel =
    index === 0 ? t('tab.today') : index === 1 ? t('tab.tomorrow') : null;

  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View style={[styles.severityBar, { backgroundColor: theme.badge }]} />

      <View style={styles.rowMain}>
        <View style={styles.rowTop}>
          <Text style={styles.weekday}>
            {formatWeekdayShort(forecast.date, settings.language)}
          </Text>
          <Text style={styles.date}>
            {formatDayAndMonthShort(forecast.date, settings.language)}
          </Text>
          {relativeLabel ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{relativeLabel}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.metrics}>
          {t('week.rainWind', {
            rain: Math.round(forecast.maxPrecipitationProbability),
            wind: Math.round(forecast.maxWindGusts),
          })}
        </Text>
      </View>

      <View style={styles.rowRight}>
        <Text style={styles.temperature}>
          {`${Math.round(forecast.minTemperature)}–${Math.round(
            forecast.maxTemperature,
          )}°C`}
        </Text>
        <Text style={[styles.severity, { color: theme.badge }]}>
          {t(`severity.${evaluation.severity}.short`)}
        </Text>
      </View>
    </View>
  );
}

export default function WeekOutlook({
  outlooks,
}: {
  outlooks: DailyOutlook[];
}) {
  return (
    <View style={styles.container}>
      {outlooks.map((outlook, index) => (
        <WeekRow
          key={outlook.forecast.date}
          outlook={outlook}
          index={index}
          isLast={index === outlooks.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  severityBar: {
    width: 4,
    height: 34,
    borderRadius: 2,
    marginRight: 12,
  },
  rowMain: {
    flex: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekday: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  date: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginLeft: 6,
  },
  tag: {
    backgroundColor: COLORS.surfaceRaised,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  tagText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  metrics: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  rowRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  temperature: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  severity: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});
