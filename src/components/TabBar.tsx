import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSettings } from '../i18n/SettingsContext';
import type { SafetySeverity } from '../types/weather';
import { COLORS, SEVERITY_THEME } from './theme';

export type TabKey = 'today' | 'tomorrow' | 'week' | 'settings';

const TAB_KEYS: TabKey[] = ['today', 'tomorrow', 'week', 'settings'];

interface TabBarProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
  severities: Partial<Record<TabKey, SafetySeverity>>;
}

export default function TabBar({ active, onChange, severities }: TabBarProps) {
  const { t } = useSettings();

  return (
    <View style={styles.bar}>
      {TAB_KEYS.map(key => {
        const isActive = key === active;
        const severity = severities[key];
        const dotColor =
          key === 'settings'
            ? isActive
              ? COLORS.accent
              : COLORS.textMuted
            : severity
              ? SEVERITY_THEME[severity].badge
              : COLORS.textMuted;

        return (
          <TouchableOpacity
            key={key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onChange(key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            activeOpacity={0.75}>
            <View style={[styles.dot, { backgroundColor: dotColor }]} />
            <Text
              style={[styles.label, isActive && styles.labelActive]}
              numberOfLines={1}>
              {t(`tab.${key}`)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    paddingHorizontal: 6,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 2,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: COLORS.surfaceRaised,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  labelActive: {
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
});
