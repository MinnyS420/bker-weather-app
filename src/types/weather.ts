/**
 * Shared domain types for the Motorbike Weather Guard app.
 */

/**
 * A single day's forecast, normalised from the Open-Meteo daily arrays.
 */
export interface WeatherForecast {
  /** ISO date string (YYYY-MM-DD) in the forecast location's local timezone. */
  date: string;
  /** Highest precipitation probability of the day, in percent (0-100). */
  maxPrecipitationProbability: number;
  /** Strongest wind gust of the day, in km/h. */
  maxWindGusts: number;
  /** Lowest air temperature of the day, in °C. */
  minTemperature: number;
  /** Highest air temperature of the day, in °C. */
  maxTemperature: number;
}

/**
 * Traffic-light rating produced by the safety engine.
 *
 * - `safe`    — nothing exceeds a threshold.
 * - `warning` — rideable, but requires extra caution.
 * - `danger`  — at least one hard threshold was breached.
 */
export type SafetySeverity = 'safe' | 'warning' | 'danger';

/**
 * Verdict returned by `evaluateRideSafety`.
 */
export interface SafetyEvaluationResult {
  /** `true` only when the severity is `safe`. */
  isSafe: boolean;
  severity: SafetySeverity;
  heavyRain: boolean;
  lightRain: boolean;
  windy: boolean;
  cold: boolean;
}

/**
 * Localised copy derived from a `SafetyEvaluationResult`.
 */
export interface SafetyCopy {
  primaryReason: string;
  details: string[];
}

/**
 * A forecast paired with its safety verdict. One per day in the outlook.
 */
export interface DailyOutlook {
  forecast: WeatherForecast;
  evaluation: SafetyEvaluationResult;
  copy: SafetyCopy;
}

/**
 * Why a weather request failed. Used to show an actionable message instead of
 * a raw exception string.
 */
export type WeatherErrorKind =
  /** The device has no usable internet connection. */
  | 'offline'
  /** The request was cut off before the API answered. */
  | 'timeout'
  /** The API answered with a non-2xx status. */
  | 'http'
  /** The payload was missing fields or had an unexpected shape. */
  | 'malformed';

/**
 * Minimal shape of the Open-Meteo `/v1/forecast` response for the daily
 * variables this app requests. Values are nullable because Open-Meteo emits
 * `null` for hours it cannot model.
 */
export interface OpenMeteoForecastResponse {
  timezone?: string;
  utc_offset_seconds?: number;
  daily?: {
    time?: string[];
    precipitation_probability_max?: (number | null)[];
    wind_gusts_10m_max?: (number | null)[];
    temperature_2m_min?: (number | null)[];
    temperature_2m_max?: (number | null)[];
  };
}
