/**
 * Browser GPS path. react-native-web does not export PermissionsAndroid, so
 * this file is picked by Vite via the `.web.ts` extension and never loads the
 * native geolocation module.
 */

import type { LanguageCode } from '../i18n/types';
import { FALLBACK_LOCATION, type GeoLocation } from '../types/location';
import { reverseGeocode } from './locationGeocode';

export type { GeoLocation } from '../types/location';
export { FALLBACK_LOCATION } from '../types/location';
export { reverseGeocode } from './locationGeocode';

const REQUEST_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(fallback), REQUEST_TIMEOUT_MS);
    promise
      .then(value => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(fallback);
      });
  });
}

function readBrowserPosition(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation unavailable'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      error => reject(error),
      {
        enableHighAccuracy: false,
        timeout: REQUEST_TIMEOUT_MS,
        maximumAge: 10 * 60 * 1000,
      },
    );
  });
}

export async function getDeviceLocation(
  language: LanguageCode,
  previous?: GeoLocation | null,
): Promise<GeoLocation> {
  const fallback = previous ?? FALLBACK_LOCATION;

  return withTimeout(
    (async () => {
      try {
        const coords = await readBrowserPosition();
        const label = await reverseGeocode(
          coords.latitude,
          coords.longitude,
          language,
        );

        return {
          latitude: coords.latitude,
          longitude: coords.longitude,
          label,
          isFallback: false,
        };
      } catch {
        return fallback;
      }
    })(),
    fallback,
  );
}
