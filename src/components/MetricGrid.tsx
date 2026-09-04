import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSettings } from '../i18n/SettingsContext';
import type { WeatherForecast } from '../types/weather';
import { SAFETY_THRESHOLDS } from '../utils/safetyChecker';
import { COLORS } from './theme';

type MetricTone = 'ok' | 'warning' | 'danger';

interface MetricProps {
  label: string;
  value: string;
  limit: string;
  tone: MetricTone;
}

function Metric({ label, value, limit, tone }: MetricProps) {
  return (
    <View
      style={[
        styles.card,
        tone === 'danger' && styles.cardDanger,
        tone === 'warning' && styles.cardWarning,
      ]}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[
          styles.value,
          tone === 'danger' && styles.valueDanger,
          tone === 'warning' && styles.valueWarning,
        ]}>
        {value}
      </Text>
      <Text style={styles.limit}>{limit}</Text>
    </View>
  );
}

function rainTone(probability: number): MetricTone {
  if (probability > SAFETY_THRESHOLDS.precipitationProbabilityPercent) {
    return 'danger';
  }
  if (probability > SAFETY_THRESHOLDS.lightRainProbabilityPercent) {
    return 'warning';
  }
  return 'ok';
}

/**
 * Each metric alongside the threshold it is judged against, so a verdict can
 * always be traced back to the number that caused it.
 */
export default function MetricGrid({
  forecast,
}: {
  forecast: WeatherForecast;
}) {
  const { t } = useSettings();

  return (
    <View style={styles.grid}>
      <Metric
        label={t('metric.rain')}
        value={`${Math.round(forecast.maxPrecipitationProbability)}%`}
        limit={t('metric.rainLimit', {
          warn: SAFETY_THRESHOLDS.lightRainProbabilityPercent,
          danger: SAFETY_THRESHOLDS.precipitationProbabilityPercent,
        })}
        tone={rainTone(forecast.maxPrecipitationProbability)}
      />
      <Metric
        label={t('metric.wind')}
        value={`${Math.round(forecast.maxWindGusts)} km/h`}
        limit={t('metric.limit', { value: `${SAFETY_THRESHOLDS.windGustsKmh} km/h` })}
        tone={
          forecast.maxWindGusts > SAFETY_THRESHOLDS.windGustsKmh
            ? 'danger'
            : 'ok'
        }
      />
      <Metric
        label={t('metric.minTemp')}
        value={`${Math.round(forecast.minTemperature)}°C`}
        limit={t('metric.limit', {
          value: `${SAFETY_THRESHOLDS.minTemperatureCelsius}°C`,
        })}
        tone={
          forecast.minTemperature < SAFETY_THRESHOLDS.minTemperatureCelsius
            ? 'warning'
            : 'ok'
        }
      />
      <Metric
        label={t('metric.maxTemp')}
        value={`${Math.round(forecast.maxTemperature)}°C`}
        limit={t('metric.dailyMax')}
        tone="ok"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  cardDanger: {
    borderColor: COLORS.breachBorder,
    backgroundColor: COLORS.breachSurface,
  },
  cardWarning: {
    borderColor: COLORS.warningBorder,
    backgroundColor: COLORS.warningSurface,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: 24,
    fontWeight: '800',
  },
  valueDanger: {
    color: COLORS.breachText,
  },
  valueWarning: {
    color: COLORS.warningText,
  },
  limit: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 6,
  },
});
