/**
 * @format
 */

import { evaluateRideSafety, worstSeverity } from '../src/utils/safetyChecker';
import type { WeatherForecast } from '../src/types/weather';

const baseForecast: WeatherForecast = {
  date: '2026-09-05',
  maxPrecipitationProbability: 10,
  maxWindGusts: 20,
  minTemperature: 15,
  maxTemperature: 27,
};

const forecastWith = (overrides: Partial<WeatherForecast>): WeatherForecast => ({
  ...baseForecast,
  ...overrides,
});

describe('evaluateRideSafety', () => {
  it('reports safe when every metric is inside its threshold', () => {
    const result = evaluateRideSafety(baseForecast);

    expect(result.isSafe).toBe(true);
    expect(result.severity).toBe('safe');
  });

  it('treats the thresholds as exclusive upper bounds', () => {
    expect(
      evaluateRideSafety(forecastWith({ maxPrecipitationProbability: 15 }))
        .severity,
    ).toBe('safe');
    expect(
      evaluateRideSafety(forecastWith({ maxPrecipitationProbability: 35 }))
        .severity,
    ).toBe('warning');
    expect(evaluateRideSafety(forecastWith({ maxWindGusts: 45 })).severity).toBe(
      'safe',
    );
    expect(evaluateRideSafety(forecastWith({ minTemperature: 8 })).severity).toBe(
      'safe',
    );
  });

  it('flags a yellow warning for light rain between 15% and 35%', () => {
    const result = evaluateRideSafety(
      forecastWith({ maxPrecipitationProbability: 22 }),
    );

    expect(result.severity).toBe('warning');
    expect(result.isSafe).toBe(false);
    expect(result.lightRain).toBe(true);
  });

  it('flags danger when rain probability is above 35%', () => {
    const result = evaluateRideSafety(
      forecastWith({ maxPrecipitationProbability: 60 }),
    );

    expect(result.severity).toBe('danger');
    expect(result.isSafe).toBe(false);
  });

  it('flags danger when gusts are above 45 km/h', () => {
    expect(evaluateRideSafety(forecastWith({ maxWindGusts: 52 })).severity).toBe(
      'danger',
    );
  });

  it('flags only a warning when it is cold but dry and calm', () => {
    const result = evaluateRideSafety(forecastWith({ minTemperature: 3 }));

    expect(result.severity).toBe('warning');
    expect(result.isSafe).toBe(false);
  });

  it('lets danger win over a light-rain warning', () => {
    const result = evaluateRideSafety(
      forecastWith({ maxPrecipitationProbability: 22, maxWindGusts: 70 }),
    );

    expect(result.severity).toBe('danger');
  });
});

describe('worstSeverity', () => {
  it('returns undefined for an empty range', () => {
    expect(worstSeverity([])).toBeUndefined();
  });

  it('picks danger over anything else', () => {
    expect(worstSeverity(['safe', 'danger', 'warning'])).toBe('danger');
  });

  it('picks warning over safe', () => {
    expect(worstSeverity(['safe', 'warning', 'safe'])).toBe('warning');
  });

  it('stays safe when every day is safe', () => {
    expect(worstSeverity(['safe', 'safe'])).toBe('safe');
  });
});
