import type { LanguageCode } from '../i18n/types';

interface ReverseGeocodeResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
}

/**
 * Turns coordinates into a city-ish label. Uses BigDataCloud's public reverse
 * geocoder so there is still no API key and no backend of our own.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number,
  language: LanguageCode,
): Promise<string> {
  const url =
    'https://api.bigdatacloud.net/data/reverse-geocode-client' +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&localityLanguage=${language}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error('reverse-geocode-http');
    }
    const payload = (await response.json()) as ReverseGeocodeResponse;
    return (
      payload.city ||
      payload.locality ||
      payload.principalSubdivision ||
      payload.countryName ||
      `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
    );
  } catch {
    return `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
  }
}
