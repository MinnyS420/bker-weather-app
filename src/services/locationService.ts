import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

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

function isPermissionDenied(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { code?: number }).code === 1
  );
}

async function requestAndroidPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  return result === PermissionsAndroid.RESULTS.GRANTED;
}

function readPosition(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
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

/**
 * Asks for the runtime location permission and reads the phone's GPS fix.
 * Falls back to Skopje only when permission is denied or the radio cannot
 * produce a position — the UI then shows that the pin is approximate.
 */
export async function getDeviceLocation(
  language: LanguageCode,
  previous?: GeoLocation | null,
): Promise<GeoLocation> {
  const fallback = previous ?? FALLBACK_LOCATION;

  return withTimeout(
    (async () => {
      try {
        const allowed = await requestAndroidPermission();
        if (!allowed) {
          return fallback;
        }

        const coords = await readPosition();
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
      } catch (error) {
        if (previous && !isPermissionDenied(error)) {
          return { ...previous, isFallback: true };
        }
        return fallback;
      }
    })(),
    fallback,
  );
}
