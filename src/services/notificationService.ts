import notifee, {
  AlarmType,
  AndroidImportance,
  AndroidNotificationSetting,
  AndroidStyle,
  AndroidVisibility,
  AuthorizationStatus,
  RepeatFrequency,
  TriggerType,
  type TimestampTrigger,
} from '@notifee/react-native';

import { SEVERITY_THEME } from '../components/theme';
import type { TranslateFn } from '../i18n';
import type {
  SafetyCopy,
  SafetyEvaluationResult,
  SafetySeverity,
  WeatherForecast,
} from '../types/weather';

const CHANNEL_ID = 'ride-alerts';
const NOTIFICATION_ID = 'daily-ride-briefing';

const NOTIFICATION_COLOR: Record<SafetySeverity, string> = {
  danger: SEVERITY_THEME.danger.badge,
  warning: SEVERITY_THEME.warning.badge,
  safe: SEVERITY_THEME.safe.badge,
};

export interface NotificationAccess {
  notificationsAllowed: boolean;
  exactAlarmsAllowed: boolean;
}

export interface BriefingSchedule {
  hour: number;
  minute: number;
  city: string;
  t: TranslateFn;
}

export async function createRideAlertChannel(t: TranslateFn): Promise<string> {
  return notifee.createChannel({
    id: CHANNEL_ID,
    name: t('notify.channelName'),
    description: t('notify.channelDesc'),
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
    vibration: true,
    lights: true,
  });
}

export async function requestNotificationAccess(): Promise<NotificationAccess> {
  const settings = await notifee.requestPermission();

  return {
    notificationsAllowed:
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL,
    exactAlarmsAllowed:
      settings.android.alarm === AndroidNotificationSetting.ENABLED,
  };
}

export async function openExactAlarmSettings(): Promise<void> {
  await notifee.openAlarmPermissionSettings();
}

/**
 * Next wall-clock occurrence of the chosen briefing time.
 */
export function getNextBriefingTime(
  hour: number,
  minute: number,
  now: Date = new Date(),
): Date {
  const target = new Date(now);
  target.setHours(hour, minute, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return target;
}

function buildTitle(
  evaluation: SafetyEvaluationResult,
  t: TranslateFn,
): string {
  switch (evaluation.severity) {
    case 'danger':
      return t('notify.dangerTitle');
    case 'warning':
      return t('notify.warningTitle');
    default:
      return t('notify.safeTitle');
  }
}

function buildBody(
  evaluation: SafetyEvaluationResult,
  forecast: WeatherForecast,
  copy: SafetyCopy,
  city: string,
  t: TranslateFn,
): string {
  const metrics = t('notify.metrics', {
    rain: Math.round(forecast.maxPrecipitationProbability),
    wind: Math.round(forecast.maxWindGusts),
    min: Math.round(forecast.minTemperature),
    max: Math.round(forecast.maxTemperature),
  });

  switch (evaluation.severity) {
    case 'danger':
      return t('notify.dangerBody', { city, metrics });
    case 'warning':
      return t('notify.warningBody', { reason: copy.primaryReason, metrics });
    default:
      return t('notify.safeBody', { city, metrics });
  }
}

/**
 * Schedules a briefing only when tomorrow is a warning or danger.
 * A green day cancels any leftover alarm so a stale red alert cannot fire.
 *
 * @returns the next fire time, or `null` when nothing is scheduled.
 */
export async function syncDailyRideBriefing(
  forecast: WeatherForecast,
  evaluation: SafetyEvaluationResult,
  copy: SafetyCopy,
  schedule: BriefingSchedule,
): Promise<Date | null> {
  if (evaluation.severity === 'safe') {
    await cancelDailyRideBriefing();
    return null;
  }

  return scheduleDailyRideBriefing(forecast, evaluation, copy, schedule);
}

/**
 * Schedules (or reschedules) the repeating briefing built from the latest
 * forecast, at the hour/minute the user picked in Settings.
 */
export async function scheduleDailyRideBriefing(
  forecast: WeatherForecast,
  evaluation: SafetyEvaluationResult,
  copy: SafetyCopy,
  schedule: BriefingSchedule,
): Promise<Date> {
  await createRideAlertChannel(schedule.t);

  const { exactAlarmsAllowed } = await requestNotificationAccess();
  const fireAt = getNextBriefingTime(schedule.hour, schedule.minute);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: fireAt.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
    alarmManager: {
      type: exactAlarmsAllowed
        ? AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE
        : AlarmType.SET_AND_ALLOW_WHILE_IDLE,
    },
  };

  await notifee.createTriggerNotification(
    {
      id: NOTIFICATION_ID,
      title: buildTitle(evaluation, schedule.t),
      body: buildBody(
        evaluation,
        forecast,
        copy,
        schedule.city,
        schedule.t,
      ),
      android: {
        channelId: CHANNEL_ID,
        smallIcon: 'ic_launcher',
        color: NOTIFICATION_COLOR[evaluation.severity],
        colorized: evaluation.severity !== 'safe',
        lights: [NOTIFICATION_COLOR[evaluation.severity], 300, 600],
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default', launchActivity: 'default' },
        style: {
          type: AndroidStyle.BIGTEXT,
          text: [copy.primaryReason, ...copy.details].join('\n'),
        },
      },
    },
    trigger,
  );

  return fireAt;
}

export async function cancelDailyRideBriefing(): Promise<void> {
  await notifee.cancelTriggerNotification(NOTIFICATION_ID);
}
