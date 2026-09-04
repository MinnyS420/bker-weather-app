/**
 * Browser stand-in for @notifee/react-native.
 *
 * Notifee is Android/iOS only, so the preview logs what would have been
 * scheduled instead of posting a real notification. Enum values mirror the
 * native package so the app code is exercised unchanged.
 */

export const AlarmType = {
  SET: 0,
  SET_AND_ALLOW_WHILE_IDLE: 1,
  SET_EXACT: 2,
  SET_EXACT_AND_ALLOW_WHILE_IDLE: 3,
  SET_ALARM_CLOCK: 4,
} as const;

export const AndroidImportance = {
  NONE: 0,
  MIN: 1,
  LOW: 2,
  DEFAULT: 3,
  HIGH: 4,
} as const;

export const AndroidNotificationSetting = {
  NOT_SUPPORTED: -1,
  DISABLED: 0,
  ENABLED: 1,
} as const;

export const AndroidStyle = {
  BIGPICTURE: 0,
  BIGTEXT: 1,
  INBOX: 2,
  MESSAGING: 3,
} as const;

export const AndroidVisibility = {
  SECRET: -1,
  PRIVATE: 0,
  PUBLIC: 1,
} as const;

export const AuthorizationStatus = {
  NOT_DETERMINED: -1,
  DENIED: 0,
  AUTHORIZED: 1,
  PROVISIONAL: 2,
} as const;

export const RepeatFrequency = {
  NONE: -1,
  HOURLY: 0,
  DAILY: 1,
  WEEKLY: 2,
} as const;

export const TriggerType = {
  TIMESTAMP: 0,
  INTERVAL: 1,
} as const;

export interface TimestampTrigger {
  type: number;
  timestamp: number;
  repeatFrequency?: number;
  alarmManager?: unknown;
}

const notifee = {
  async createChannel(channel: unknown): Promise<string> {
    console.log('[notifee stub] createChannel', channel);
    return 'ride-alerts';
  },

  async requestPermission() {
    console.log('[notifee stub] requestPermission');
    return {
      authorizationStatus: AuthorizationStatus.AUTHORIZED,
      android: { alarm: AndroidNotificationSetting.ENABLED },
    };
  },

  async openAlarmPermissionSettings(): Promise<void> {
    console.log('[notifee stub] openAlarmPermissionSettings');
  },

  async createTriggerNotification(
    notification: { title?: string; body?: string },
    trigger: TimestampTrigger,
  ): Promise<string> {
    console.log(
      `[notifee stub] scheduled "${notification.title}" for ` +
        `${new Date(trigger.timestamp).toLocaleString()}`,
      { notification, trigger },
    );
    return 'daily-ride-briefing';
  },

  async cancelTriggerNotification(id: string): Promise<void> {
    console.log('[notifee stub] cancelTriggerNotification', id);
  },
};

export default notifee;
