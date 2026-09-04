import type {
  OpenMeteoForecastResponse,
  WeatherErrorKind,
  WeatherForecast,
} from '../types/weather';
import type { GeoLocation } from '../types/location';

/** Days of outlook to request, starting with today. */
export const FORECAST_DAYS = 7;

/**
 * Open-Meteo returns the daily arrays starting at today, relative to the
 * location's own timezone.
 */
export const TODAY_INDEX = 0;
export const TOMORROW_INDEX = 1;

const REQUEST_TIMEOUT_MS = 15000;

export class WeatherServiceError extends Error {
  readonly kind: WeatherErrorKind;
  readonly cause?: unknown;

  constructor(kind: WeatherErrorKind, cause?: unknown) {
    super(kind);
    this.name = 'WeatherServiceError';
    this.kind = kind;
    this.cause = cause;
  }
}

function forecastUrl(location: GeoLocation): string {
  return (
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    '&daily=precipitation_probability_max,wind_gusts_10m_max,temperature_2m_min,temperature_2m_max' +
    `&forecast_days=${FORECAST_DAYS}` +
    '&timezone=auto'
  );
}

function isNetworkFailure(error: unknown): boolean {
  return (
    error instanceof TypeError &&
    /network|failed to fetch|request failed/i.test(error.message)
  );
}

function isAbort(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { name?: string }).name === 'AbortError'
  );
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function readNumber(
  values: (number | null)[] | undefined,
  index: number,
  fallback?: number,
): number {
  const value = values?.[index];

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (fallback !== undefined) {
    return fallback;
  }

  throw new WeatherServiceError('malformed');
}

/**
 * Pulls a weekly outlook from Open-Meteo for the given coordinates, over the
 * device's own internet connection. No API key and no backend involved.
 */
export async function fetchWeeklyForecast(
  location: GeoLocation,
): Promise<WeatherForecast[]> {
  let response: Response;

  try {
    response = await fetchWithTimeout(forecastUrl(location));
  } catch (error) {
    if (isAbort(error)) {
      throw new WeatherServiceError('timeout', error);
    }
    if (isNetworkFailure(error)) {
      throw new WeatherServiceError('offline', error);
    }
    throw new WeatherServiceError('http', error);
  }

  if (!response.ok) {
    throw new WeatherServiceError('http', response.status);
  }

  let payload: OpenMeteoForecastResponse;
  try {
    payload = (await response.json()) as OpenMeteoForecastResponse;
  } catch (error) {
    throw new WeatherServiceError('malformed', error);
  }

  const daily = payload.daily;
  const dates = daily?.time;

  if (!daily || !Array.isArray(dates) || dates.length <= TOMORROW_INDEX) {
    throw new WeatherServiceError('malformed');
  }

  return dates.slice(0, FORECAST_DAYS).map((date, index) => ({
    date,
    maxPrecipitationProbability: readNumber(
      daily.precipitation_probability_max,
      index,
      0,
    ),
    maxWindGusts: readNumber(daily.wind_gusts_10m_max, index),
    minTemperature: readNumber(daily.temperature_2m_min, index),
    maxTemperature: readNumber(daily.temperature_2m_max, index),
  }));
}
