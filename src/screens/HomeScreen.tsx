import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DayDetail from '../components/DayDetail';
import TabBar, { type TabKey } from '../components/TabBar';
import WeekOutlook from '../components/WeekOutlook';
import { COLORS } from '../components/theme';
import { useSettings } from '../i18n/SettingsContext';
import {
  FALLBACK_LOCATION,
  getDeviceLocation,
  reverseGeocode,
  type GeoLocation,
} from '../services/locationService';
import {
  openExactAlarmSettings,
  requestNotificationAccess,
  syncDailyRideBriefing,
} from '../services/notificationService';
import {
  fetchWeeklyForecast,
  TODAY_INDEX,
  TOMORROW_INDEX,
  WeatherServiceError,
} from '../services/weatherService';
import SettingsScreen from './SettingsScreen';
import {
  describeRideSafety,
  evaluateRideSafety,
  worstSeverity,
} from '../utils/safetyChecker';
import {
  formatClock,
  formatForecastDate,
  formatTime,
  toIsoDate,
} from '../utils/format';
import type {
  DailyOutlook,
  SafetySeverity,
  WeatherForecast,
} from '../types/weather';

export default function HomeScreen() {
  const { settings, ready, t } = useSettings();

  const [activeTab, setActiveTab] = useState<TabKey>('tomorrow');
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [forecasts, setForecasts] = useState<WeatherForecast[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [nextBriefing, setNextBriefing] = useState<Date | null>(null);
  const [needsExactAlarm, setNeedsExactAlarm] = useState(false);
  const locationRef = useRef<GeoLocation | null>(null);

  const outlooks = useMemo<DailyOutlook[]>(
    () =>
      (forecasts ?? []).map(forecast => {
        const evaluation = evaluateRideSafety(forecast);
        return {
          forecast,
          evaluation,
          copy: describeRideSafety(forecast, evaluation, t),
        };
      }),
    [forecasts, t],
  );

  const today = outlooks[TODAY_INDEX];
  const tomorrow = outlooks[TOMORROW_INDEX];

  const severities = useMemo<Partial<Record<TabKey, SafetySeverity>>>(
    () => ({
      today: today?.evaluation.severity,
      tomorrow: tomorrow?.evaluation.severity,
      week: worstSeverity(outlooks.map(item => item.evaluation.severity)),
    }),
    [today, tomorrow, outlooks],
  );

  const load = useCallback(async (viaPullToRefresh = false) => {
    if (viaPullToRefresh) {
      setIsRefreshing(true);
    } else if (!locationRef.current) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);

    try {
      const nextLocation = await getDeviceLocation(
        settings.language,
        locationRef.current,
      );
      locationRef.current = nextLocation;
      setLocation(nextLocation);

      const week = await fetchWeeklyForecast(nextLocation);
      setForecasts(week);
      setLastUpdated(new Date());
    } catch (caught) {
      setForecasts(null);
      setError(
        caught instanceof WeatherServiceError
          ? t(`error.${caught.kind}`)
          : t('error.unexpected'),
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [settings.language, t]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    let cancelled = false;

    requestNotificationAccess()
      .then(access => {
        if (!cancelled) {
          setNeedsExactAlarm(!access.exactAlarmsAllowed);
        }
      })
      .catch(() => undefined);

    load();

    return () => {
      cancelled = true;
    };
    // First load waits for persisted settings so the language is already right.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (!location || location.isFallback) {
      return;
    }

    let cancelled = false;
    reverseGeocode(
      location.latitude,
      location.longitude,
      settings.language,
    ).then(label => {
      if (!cancelled) {
        setLocation(current =>
          current && current.label !== label ? { ...current, label } : current,
        );
      }
    });

    return () => {
      cancelled = true;
    };
    // Relabel the pin when the UI language changes; coordinates stay the same.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.language]);

  useEffect(() => {
    if (!tomorrow || !location) {
      return;
    }

    syncDailyRideBriefing(tomorrow.forecast, tomorrow.evaluation, tomorrow.copy, {
      hour: settings.briefingHour,
      minute: settings.briefingMinute,
      city: location.label,
      t,
    })
      .then(setNextBriefing)
      .catch(() => setNextBriefing(null));
  }, [
    location,
    settings.briefingHour,
    settings.briefingMinute,
    settings.language,
    t,
    tomorrow,
  ]);

  const reminderTime = formatTime(
    settings.briefingHour,
    settings.briefingMinute,
  );

  const notificationCard = (
    <>
      <Text style={styles.sectionLabel}>{t('notifications')}</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          {nextBriefing
            ? t('nextReminder', {
                date: formatForecastDate(
                  toIsoDate(nextBriefing),
                  settings.language,
                ),
                time: formatClock(nextBriefing),
              })
            : tomorrow?.evaluation.severity === 'safe'
              ? t('reminderSkippedSafe')
              : t('reminderNotScheduled', { time: reminderTime })}
        </Text>

        {needsExactAlarm ? (
          <TouchableOpacity
            style={styles.linkButton}
            onPress={openExactAlarmSettings}>
            <Text style={styles.linkButtonText}>
              {t('exactAlarm', { time: reminderTime })}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );

  function renderContent() {
    if (activeTab === 'settings') {
      return <SettingsScreen location={location} />;
    }

    if (error) {
      return (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>{t('error.title')}</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (!forecasts) {
      return (
        <View style={styles.loadingBlock}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      );
    }

    if (activeTab === 'week') {
      return (
        <>
          <Text style={[styles.sectionLabel, styles.sectionLabelFirst]}>
            {t('weekTitle')}
          </Text>
          <WeekOutlook outlooks={outlooks} />
        </>
      );
    }

    const outlook = activeTab === 'today' ? today : tomorrow;

    if (!outlook) {
      return (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>{t('error.noDay')}</Text>
        </View>
      );
    }

    return (
      <DayDetail outlook={outlook}>
        {activeTab === 'tomorrow' ? notificationCard : null}
      </DayDetail>
    );
  }

  const isBusy = Boolean(isRefreshing || (isLoading && !forecasts));
  const placeLabel = location?.label ?? FALLBACK_LOCATION.label;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Moto Weather Guard</Text>
          <Text style={styles.subtitle}>
            {placeLabel}
            {lastUpdated
              ? ` · ${t('header.updatedAt', { time: formatClock(lastUpdated) })}`
              : ''}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.refreshButton, isBusy && styles.refreshButtonBusy]}
          onPress={() => load()}
          disabled={isBusy}
          activeOpacity={0.85}>
          {isBusy ? (
            <ActivityIndicator size="small" color={COLORS.textPrimary} />
          ) : (
            <Text style={styles.refreshButtonText}>{t('header.refresh')}</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => load(true)}
            tintColor={COLORS.textSecondary}
            colors={[COLORS.accent]}
            progressBackgroundColor={COLORS.surface}
          />
        }>
        {renderContent()}
      </ScrollView>

      <TabBar
        active={activeTab}
        onChange={setActiveTab}
        severities={severities}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  headerText: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 3,
  },
  refreshButton: {
    minWidth: 84,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceRaised,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButtonBusy: {
    opacity: 0.6,
  },
  refreshButtonText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  loadingBlock: {
    paddingVertical: 64,
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 12,
    fontSize: 15,
  },
  errorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    padding: 18,
  },
  errorTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
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
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  cardText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  linkButton: {
    marginTop: 8,
    paddingVertical: 10,
  },
  linkButtonText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
});
