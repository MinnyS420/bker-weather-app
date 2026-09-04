import type { SafetySeverity } from '../types/weather';

export const COLORS = {
  background: '#0A0D12',
  surface: '#141922',
  surfaceRaised: '#1B2230',
  border: '#252E3D',
  textPrimary: '#F4F7FB',
  textSecondary: '#8D97A8',
  textMuted: '#5E6879',
  accent: '#3B82F6',
  breachSurface: '#1A1013',
  breachBorder: '#7F1D1D',
  breachText: '#F87171',
  warningSurface: '#1A1408',
  warningBorder: '#854D0E',
  warningText: '#FBBF24',
} as const;

interface SeverityTheme {
  card: string;
  badge: string;
}

export const SEVERITY_THEME: Record<SafetySeverity, SeverityTheme> = {
  safe: {
    card: '#15803D',
    badge: '#22C55E',
  },
  warning: {
    card: '#B45309',
    badge: '#F59E0B',
  },
  danger: {
    card: '#B91C1C',
    badge: '#EF4444',
  },
};
