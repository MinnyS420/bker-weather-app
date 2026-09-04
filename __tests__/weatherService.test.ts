/**
 * @format
 */

import {
  fetchWeeklyForecast,
  TODAY_INDEX,
  TOMORROW_INDEX,
  WeatherServiceError,
} from '../src/services/weatherService';
import { FALLBACK_LOCATION } from '../src/types/location';

const okResponse = (payload: unknown) =>
  ({
    ok: true,
    status: 200,
    json: async () => payload,
  } as Response);

const validPayload = {
  timezone: 'Europe/Skopje',
  daily: {
    time: ['2026-09-04', '2026-09-05', '2026-09-06'],
    precipitation_probability_max: [3, 0, 12],
    wind_gusts_10m_max: [33.5, 15.8, 31.7],
    temperature_2m_min: [17.2, 15.5, 18.9],
    temperature_2m_max: [32.0, 35.5, 33.3],
  },
};

const mockFetch = (impl: () => Promise<Response>) => {
  // React Native declares `fetch` as an ambient function rather than a var, so
  // it is not reachable through `globalThis` without a cast.
  (globalThis as unknown as { fetch: unknown }).fetch = jest.fn(impl);
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('fetchWeeklyForecast', () => {
  it('maps every day, with index 0 as today and index 1 as tomorrow', async () => {
    mockFetch(async () => okResponse(validPayload));

    const week = await fetchWeeklyForecast(FALLBACK_LOCATION);

    expect(week).toHaveLength(3);
    expect(week[TODAY_INDEX].date).toBe('2026-09-04');
    expect(week[TOMORROW_INDEX]).toEqual({
      date: '2026-09-05',
      maxPrecipitationProbability: 0,
      maxWindGusts: 15.8,
      minTemperature: 15.5,
      maxTemperature: 35.5,
    });
  });

  it('treats a null precipitation probability as a dry day', async () => {
    mockFetch(async () =>
      okResponse({
        ...validPayload,
        daily: {
          ...validPayload.daily,
          precipitation_probability_max: [null, null, null],
        },
      }),
    );

    const week = await fetchWeeklyForecast(FALLBACK_LOCATION);

    expect(week[TOMORROW_INDEX].maxPrecipitationProbability).toBe(0);
  });

  it('reports a lost connection as an offline error', async () => {
    mockFetch(async () => {
      throw new TypeError('Network request failed');
    });

    await expect(fetchWeeklyForecast(FALLBACK_LOCATION)).rejects.toMatchObject({
      name: 'WeatherServiceError',
      kind: 'offline',
    });
  });

  it('rejects a non-2xx response', async () => {
    mockFetch(async () => ({ ok: false, status: 503 } as Response));

    await expect(fetchWeeklyForecast(FALLBACK_LOCATION)).rejects.toBeInstanceOf(
      WeatherServiceError,
    );
  });

  it('rejects a payload that cannot cover today and tomorrow', async () => {
    mockFetch(async () =>
      okResponse({ daily: { ...validPayload.daily, time: ['2026-09-04'] } }),
    );

    await expect(fetchWeeklyForecast(FALLBACK_LOCATION)).rejects.toMatchObject({
      kind: 'malformed',
    });
  });

  it('rejects a payload with a missing wind field', async () => {
    mockFetch(async () =>
      okResponse({
        daily: { ...validPayload.daily, wind_gusts_10m_max: [1, null, 3] },
      }),
    );

    await expect(fetchWeeklyForecast(FALLBACK_LOCATION)).rejects.toMatchObject({
      kind: 'malformed',
    });
  });
});
