import type { TranslateFn } from '../i18n';
import type {
  SafetyCopy,
  SafetyEvaluationResult,
  SafetySeverity,
  WeatherForecast,
} from '../types/weather';

/**
 * Hard limits for riding a motorbike. Tuned for street tyres on public roads.
 */
export const SAFETY_THRESHOLDS = {
  /**
   * Above this precipitation chance a light shower is likely. Rideable, but
   * roads will be damp — yellow warning.
   */
  lightRainProbabilityPercent: 15,
  /** Above this precipitation chance the asphalt is treated as slippery. */
  precipitationProbabilityPercent: 35,
  /** Above this gust speed crosswinds can destabilise a two-wheeler. */
  windGustsKmh: 45,
  /** Below this temperature tyres stay cold and grip drops. */
  minTemperatureCelsius: 8,
} as const;

const round = (value: number): number => Math.round(value);

const SEVERITY_RANK: Record<SafetySeverity, number> = {
  safe: 0,
  warning: 1,
  danger: 2,
};

export function worstSeverity(
  severities: SafetySeverity[],
): SafetySeverity | undefined {
  return severities.reduce<SafetySeverity | undefined>(
    (worst, severity) =>
      worst === undefined || SEVERITY_RANK[severity] > SEVERITY_RANK[worst]
        ? severity
        : worst,
    undefined,
  );
}

/**
 * Applies the motorbike safety rules to a single day's forecast.
 *
 * Heavy rain and wind are disqualifying on their own. Light rain and cold are
 * only ever a warning because they are rideable with extra caution.
 */
export function evaluateRideSafety(
  forecast: WeatherForecast,
): SafetyEvaluationResult {
  const heavyRain =
    forecast.maxPrecipitationProbability >
    SAFETY_THRESHOLDS.precipitationProbabilityPercent;
  const lightRain =
    !heavyRain &&
    forecast.maxPrecipitationProbability >
      SAFETY_THRESHOLDS.lightRainProbabilityPercent;
  const windy = forecast.maxWindGusts > SAFETY_THRESHOLDS.windGustsKmh;
  const cold = forecast.minTemperature < SAFETY_THRESHOLDS.minTemperatureCelsius;

  if (heavyRain || windy) {
    return {
      isSafe: false,
      severity: 'danger',
      heavyRain,
      lightRain,
      windy,
      cold,
    };
  }

  if (lightRain || cold) {
    return {
      isSafe: false,
      severity: 'warning',
      heavyRain,
      lightRain,
      windy,
      cold,
    };
  }

  return {
    isSafe: true,
    severity: 'safe',
    heavyRain,
    lightRain,
    windy,
    cold,
  };
}

/**
 * Turns the language-free verdict into user-facing copy.
 */
export function describeRideSafety(
  forecast: WeatherForecast,
  evaluation: SafetyEvaluationResult,
  t: TranslateFn,
): SafetyCopy {
  if (evaluation.severity === 'danger') {
    const details: string[] = [];
    if (evaluation.heavyRain) {
      details.push(
        t('detail.heavyRain', {
          value: round(forecast.maxPrecipitationProbability),
          limit: SAFETY_THRESHOLDS.precipitationProbabilityPercent,
        }),
      );
    }
    if (evaluation.windy) {
      details.push(
        t('detail.wind', {
          value: round(forecast.maxWindGusts),
          limit: SAFETY_THRESHOLDS.windGustsKmh,
        }),
      );
    }
    if (evaluation.cold) {
      details.push(
        t('detail.cold', {
          value: round(forecast.minTemperature),
          limit: SAFETY_THRESHOLDS.minTemperatureCelsius,
        }),
      );
    }
    return {
      primaryReason: t(
        evaluation.heavyRain ? 'reason.dangerRain' : 'reason.dangerWind',
      ),
      details,
    };
  }

  if (evaluation.severity === 'warning') {
    const details: string[] = [];
    if (evaluation.lightRain) {
      details.push(
        t('detail.lightRain', {
          value: round(forecast.maxPrecipitationProbability),
          limit: SAFETY_THRESHOLDS.lightRainProbabilityPercent,
        }),
      );
    }
    if (evaluation.cold) {
      details.push(
        t('detail.cold', {
          value: round(forecast.minTemperature),
          limit: SAFETY_THRESHOLDS.minTemperatureCelsius,
        }),
      );
    }
    return {
      primaryReason: t(
        evaluation.lightRain ? 'reason.warningRain' : 'reason.warningCold',
      ),
      details,
    };
  }

  return {
    primaryReason: t('reason.safe'),
    details: [
      t('detail.safeRain', {
        value: round(forecast.maxPrecipitationProbability),
      }),
      t('detail.safeWind', { value: round(forecast.maxWindGusts) }),
      t('detail.safeTemp', {
        min: round(forecast.minTemperature),
        max: round(forecast.maxTemperature),
      }),
    ],
  };
}
