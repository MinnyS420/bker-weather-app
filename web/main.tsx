import { AppRegistry } from 'react-native';

import App from '../src/App';
import { name as appName } from '../app.json';

/**
 * Preview-only scenario switch. Append `?mock=danger` (or `warning`, `safe`,
 * `offline`) to the URL to see each state without waiting for the real Skopje
 * weather to cooperate. Lives here rather than in `src/` so the shipped app
 * has no test hooks in it.
 */
type MockScenario = 'safe' | 'warning' | 'danger';

const SCENARIOS: Record<
  MockScenario,
  { rain: number; gusts: number; min: number; max: number }
> = {
  safe: { rain: 5, gusts: 18, min: 14, max: 26 },
  warning: { rain: 22, gusts: 22, min: 14, max: 24 },
  danger: { rain: 85, gusts: 63, min: 6, max: 12 },
};

function isoDate(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

const FORECAST_DAYS = 7;

/** Nudges each day off the base figures so the week strip isn't seven clones. */
function spread(base: number, index: number, step: number): number {
  return Math.max(0, Math.round(base + Math.sin(index * 1.7) * step));
}

function installMock(scenario: MockScenario): void {
  const { rain, gusts, min, max } = SCENARIOS[scenario];
  const days = Array.from({ length: FORECAST_DAYS }, (_, index) => index);

  const payload = {
    timezone: 'Europe/Skopje',
    daily: {
      time: days.map(isoDate),
      // Index 0 is today, index 1 tomorrow; both keep the requested scenario
      // exactly so the two headline sections match what was asked for.
      precipitation_probability_max: days.map(index =>
        index < 2 ? rain : spread(rain, index, 30),
      ),
      wind_gusts_10m_max: days.map(index =>
        index < 2 ? gusts : spread(gusts, index, 25),
      ),
      temperature_2m_min: days.map(index =>
        index < 2 ? min : spread(min, index, 6),
      ),
      temperature_2m_max: days.map(index =>
        index < 2 ? max : spread(max, index, 6),
      ),
    },
  };

  window.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  console.log(`[preview] mocking the "${scenario}" scenario`, payload);
}

const requested = new URLSearchParams(window.location.search).get('mock');
if (requested === 'offline') {
  // Mirrors how fetch rejects when the device has no connection.
  window.fetch = async () => {
    throw new TypeError('Network request failed');
  };
  console.log('[preview] simulating a lost internet connection');
} else if (
  requested === 'safe' ||
  requested === 'warning' ||
  requested === 'danger'
) {
  installMock(requested);
}

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('phone-screen'),
});
